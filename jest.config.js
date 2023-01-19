module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*interfaces.ts',
    '!<rootDir>/src/**/*helper.ts',
    '!<rootDir>/src/**/*factory.ts',
    '!<rootDir>/src/**/config.ts',
    '!<rootDir>/src/**/server.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  clearMocks: true
}
