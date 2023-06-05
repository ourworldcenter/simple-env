import SimpleEnv from '../SimpleEnv'

beforeAll(() => {
  const option = {
    envPath: 'src/test/.test.env'
  }
  return new SimpleEnv(option)
})

test('populate env', () => {
  expect(process.env.BASIC).toBe('basic')
  expect(process.env.SINGLE_QUOTE).toBe('single quote')
  expect(process.env.DOUBLE_QUOTE).toBe('double quote')
  expect(process.env.EMPTY).toBe('')
  expect(process.env.TRIM_SPACE).toBe('trim space')
  expect(process.env.SYMBOLS).toBe('~!@$%^&*()_+')
})
