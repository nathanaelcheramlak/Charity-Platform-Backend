# Create main folders
mkdir -p src/{api,config,middleware,utils,types}
mkdir -p src/api/{auth,users,charities,donations,events,volunteers}
mkdir -p src/utils/{errors,validators,helpers}
mkdir -p prisma/migrations
mkdir -p public/{uploads,assets}
mkdir -p tests/{integration,unit,fixtures}
mkdir -p scripts docs

# Create necessary base files
touch src/app.ts
touch src/config/{env.ts,logger.ts,database.ts,server.ts}
touch src/middleware/{auth.middleware.ts,error.middleware.ts,validation.middleware.ts,upload.middleware.ts}
touch src/utils/errors/{api-error.ts,http-errors.ts}
touch src/utils/helpers/{pagination.helper.ts,response.helper.ts}
touch src/utils/constants.ts
touch src/types/{express.d.ts,custom.d.ts}
touch .env.example
touch .gitignore