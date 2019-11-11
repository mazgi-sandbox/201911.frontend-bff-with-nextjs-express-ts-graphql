module.exports = {
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['config', 'db', 'entities', 'lib', 'node_modules'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  verbose: true
}
