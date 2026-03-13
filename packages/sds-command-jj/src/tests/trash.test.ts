/*******************************************************************************
*                                                                              *
*                      trash commands — integration tests                      *
*                                                                              *
*******************************************************************************/

// covers: TR (trash list, purge-all, purge-expired)

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import fs   from 'node:fs/promises'
import os   from 'node:os'
import path from 'node:path'
import { runCLI } from './runCLI.js'

//----------------------------------------------------------------------------//
//                       TR — trash list / purge-all / purge-expired         //
//----------------------------------------------------------------------------//

describe('trash commands (TR)', { timeout:30000 }, () => {
  let PersistenceDir:string

  beforeAll(async () => {
    PersistenceDir = await fs.mkdtemp(path.join(os.tmpdir(), 'sds-tr-'))
    // seed the store with a fresh item (creates the DB)
    await runCLI([
      '--store', 'test', '--persistence-dir', PersistenceDir, 'entry', 'create', '--label', 'seed',
    ])
  })

  afterAll(async () => {
    await fs.rm(PersistenceDir, { recursive:true, force:true })
  })

  it('TR-01: trash list on an empty trash returns empty text marker', async () => {
    const Result = await runCLI([
      '--store', 'test', '--persistence-dir', PersistenceDir, 'trash', 'list',
    ])
    expect(Result.ExitCode).toBe(0)
    expect(Result.Stdout).toMatch(/empty/)
  })

  it('TR-02: trash list shows deleted entries', async () => {
    const Create = await runCLI([
      '--store', 'test', '--persistence-dir', PersistenceDir, 'entry', 'create', '--label', 'deleteme',
    ])
    const Id = Create.Stdout.trim()

    await runCLI(['--store', 'test', '--persistence-dir', PersistenceDir, 'entry', 'delete', Id])

    const Result = await runCLI([
      '--store', 'test', '--persistence-dir', PersistenceDir, '--format', 'json', 'trash', 'list',
    ])
    expect(Result.ExitCode).toBe(0)
    const Entries:Array<{ id:string }> = JSON.parse(Result.Stdout)
    expect(Entries.some((e) => e.id === Id)).toBe(true)
  })

  it('TR-03: purge-all empties the trash', async () => {
    // ensure at least one item is in trash from TR-02
    const PurgeAll = await runCLI([
      '--store', 'test', '--persistence-dir', PersistenceDir, 'trash', 'purge-all',
    ])
    expect(PurgeAll.ExitCode).toBe(0)

    const List = await runCLI([
      '--store', 'test', '--persistence-dir', PersistenceDir, 'trash', 'list',
    ])
    expect(List.ExitCode).toBe(0)
    expect(List.Stdout).toMatch(/empty/)
  })

  it('TR-04: purge-expired with very large TTL removes nothing', async () => {
    // delete an item and then purge with 100-year TTL
    const Create = await runCLI([
      '--store', 'test', '--persistence-dir', PersistenceDir, 'entry', 'create', '--label', 'recent',
    ])
    const Id = Create.Stdout.trim()
    await runCLI(['--store', 'test', '--persistence-dir', PersistenceDir, 'entry', 'delete', Id])

    const Result = await runCLI([
      '--store', 'test', '--persistence-dir', PersistenceDir, '--format', 'json',
      'trash', 'purge-expired', '--ttl', '3153600000000',
    ])
    expect(Result.ExitCode).toBe(0)
    const Json = JSON.parse(Result.Stdout)
    expect(Json.purged).toBe(0)

    // item is still in trash
    const List = await runCLI([
      '--store', 'test', '--persistence-dir', PersistenceDir, '--format', 'json', 'trash', 'list',
    ])
    const Entries:Array<{ id:string }> = JSON.parse(List.Stdout)
    expect(Entries.some((e) => e.id === Id)).toBe(true)
  })

  it('TR-05: purge-expired with --ttl 0 exits with UsageError (code 2)', async () => {
    const Result = await runCLI([
      '--store', 'test', '--persistence-dir', PersistenceDir,
      'trash', 'purge-expired', '--ttl', '0',
    ])
    expect(Result.ExitCode).toBe(2)
    expect(Result.Stderr).toMatch(/--ttl/i)
  })

  it('TR-06: --ttl with a non-integer value exits with UsageError (code 2)', async () => {
    const Result = await runCLI([
      '--store', 'test', '--persistence-dir', PersistenceDir,
      'trash', 'purge-expired', '--ttl', 'abc',
    ])
    expect(Result.ExitCode).toBe(2)
  })

  it('TR-07: trash list --only with an invalid value exits with UsageError (code 2)', async () => {
    const Result = await runCLI([
      '--store', 'test', '--persistence-dir', PersistenceDir,
      'trash', 'list', '--only', 'foobar',
    ])
    expect(Result.ExitCode).toBe(2)
    expect(Result.Stderr).toMatch(/--only/i)
  })

  it('TR-08: purge-expired with --ttl -1 exits with UsageError (code 2)', async () => {
    const Result = await runCLI([
      '--store', 'test', '--persistence-dir', PersistenceDir,
      'trash', 'purge-expired', '--ttl', '-1',
    ])
    expect(Result.ExitCode).toBe(2)
    expect(Result.Stderr).toMatch(/--ttl/i)
  })

  it('TR-09: purge-all persists across sessions — many entries', async () => {
    // separate persistence dir for isolation
    const Dir = await fs.mkdtemp(path.join(os.tmpdir(), 'sds-tr09-'))
    try {
      // session A: create 5 items
      const Ids:string[] = []
      for (let i = 0; i < 5; i++) {
        const C = await runCLI([
          '--store', 'tr09', '--persistence-dir', Dir,
          'entry', 'create', '--label', `item-${i}`,
        ])
        expect(C.ExitCode).toBe(0)
        Ids.push(C.Stdout.trim())
      }

      // session B: trash all 5
      for (const Id of Ids) {
        const D = await runCLI([
          '--store', 'tr09', '--persistence-dir', Dir, 'entry', 'delete', Id,
        ])
        expect(D.ExitCode).toBe(0)
      }

      // session C: purge-all
      const Purge = await runCLI([
        '--store', 'tr09', '--persistence-dir', Dir,
        '--format', 'json', 'trash', 'purge-all',
      ])
      expect(Purge.ExitCode).toBe(0)
      expect(JSON.parse(Purge.Stdout).purged).toBe(5)

      // session D: verify trash is empty
      const TrashList = await runCLI([
        '--store', 'tr09', '--persistence-dir', Dir,
        '--format', 'json', 'trash', 'list',
      ])
      expect(TrashList.ExitCode).toBe(0)
      expect(JSON.parse(TrashList.Stdout)).toEqual([])

      // session E: verify tree only contains system containers
      const Tree = await runCLI([
        '--store', 'tr09', '--persistence-dir', Dir,
        '--format', 'json', 'tree', 'show',
      ])
      expect(Tree.ExitCode).toBe(0)
      const Root = JSON.parse(Tree.Stdout).root as Array<{ id:string }>
      expect(Root.length).toBe(2) // only Trash and LostAndFound
    } finally {
      await fs.rm(Dir, { recursive:true, force:true })
    }
  })
})
