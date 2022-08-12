const env = {}

env.isDev   = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev'
env.isTest  = process.env.NODE_ENV === 'testing'     || process.env.NODE_ENV === 'test'
env.isStage = process.env.NODE_ENV === 'staging'     || process.env.NODE_ENV === 'stage'
env.isProd  = process.env.NODE_ENV === 'production'  || process.env.NODE_ENV === 'prod'

export default env
