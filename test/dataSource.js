import assert from 'assert'
import DataSource from '../src/store/model/dataSource.js'

describe('dataSource model', function () {
  it('init check', function () {
    let ds = new DataSource()
    assert.equal(typeof ds, 'object')
    assert.equal(ds.title, 'new source')
    assert.equal(ds.type, 0)
    assert.equal(ds.foreignDB, null)
  })
  it('[method]linkDB', function () {
    const title = 'new source'
    const type = 0
    const db = {}
    let ds = new DataSource({title, type})
    ds.linkDB(db)
    assert.equal(ds.foreignDB, db)
  })
  it('[method]updateValue', function () {
    const db = {}
    const props = {
      title: 'test title',
      type: 2,
      foreignDB: db
    }
    let ds = new DataSource()
    ds.updateValue(props)
    assert.equal(ds.title, props.title)
    assert.equal(ds.type, props.type)
    assert.equal(ds.foreignDB, db)
  })
})