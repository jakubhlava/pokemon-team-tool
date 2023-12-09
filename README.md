# Pokémon team tool

Tool for building Pokémon teams.

### This tool allows you to
- Build teams of your Pokémon and save them for later
- List and view teams, that you created before
- See overall stats of your team and get suggestions for improvements, so your team could be more balanced

### Scope of this project
- Landing page with login
- User accounts using "login with Discord" (next-auth)
- Team list page with ability to create new one
- Team builder page - searching for pokemons, adding/removing them from team, adding/removing moves, which will be used
- Team details with stats and simple suggestions for better balance
 
### Authors

- Pavel Kraus (540455)
- Jakub Hlava (540477)
- Dušan Úradník (542291)

### Tech used
- Next 14
- Prisma
- SQLite
- Pokenode-ts
- Tanstack Query
- Zod
- React Hook Form
- Vercel

## How to develop and run

### Requirements
- Node.js 18+ (made with 20.x)

### Development

1) Install dependencies

```bash
npm install
```

2) Then run the development server:

```bash
npm run dev
```

3) Finally open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment variables

- `NEXTAUTH_SECRET` - Next Auth secret
- `NEXTAUTH_URL` - Base URL for next auth
- `DISCORD_CLIENT_ID` - Client ID of Discord OAuth application
- `DISCORD_CLIENT_SECRET` - Client secret of Discord OAuth application
- `DEPLOY_URL` - URL of deployed application (e.g. for opengraph)
- `DATABASE_URL` - URI of database

## Attributions to used resources
Pikachu head SVG from https://www.svgart.org/pikachu-head-svg/

[Poke ball](https://icons8.com/icon/eQoYCq7PgMch/pokeball) icon by [Icons8](https://icons8.com)

## Contributing
Feel free to contribute to this project by creating issues and pull requests.

## License
MIT