### DONE (setup):

turborepo + pnpm <br>
next.js <br>
@repo/tsconfig <br>
mobile: nativewind <br>
@repo/eslint-config <br>
husky CI <br>
@repo/tailwind-config <br>
shadcn-ui <br>
@repo/prettier-config <br>
docker <br>
prisma + env vars <br>
docker with prisma <br>
next-auth (not working with expo) so... <br>
@repo/db: prisma <br>
@repo/api: tRPC <br>
@repo/auth: next-auth <br>
@repo/store: zustand <br>
persist data on mobile <br>

### TODO (setup):

@repo/shared?: react-native-web <br>
@repo/ui: shadcn-ui <br>
docker osx (ios simulator)

### reset

```sh
find . -name .turbo -type d -prune -exec rm -rf '{}' + && \
find . -name node_modules -type d -prune -exec rm -rf '{}' + && \
find . -name dist -type d -prune -exec rm -rf '{}' + && \
rm pnpm-lock.yaml && \
pnpm i && \
pnpm db:generate && \
pnpm build \
 -F @repo/validators \
 -F @repo/store \
 -F @repo/db \
 -F @repo/auth \
 -F @repo/api
```

### getting started

```sh
# database
pnpm docker:dev:up

# web & server
pnpm -F web dev

# emulator
/home/fezza/Android/Sdk/emulator/emulator @Pixel_4_API_35

# expo
pnpm -F mobile dev
```
