# Poliorama Back-end
![node version][1]
![npm version][2] 
![type typescript][3]
[![style standard][4]][5]

API REST of Poliorama, project per data visualization about politics structures of Colombia

### Getting Started

### Built With

### Source Structure

    └───dist................................ traspiled files
    └───logs
    └───node_modules
    └───src
        └───config.......................... eviroments varibles
        └───api 
        │   └───components
        │   │   └───user
        │   └───middleware
        │   │   routes.ts
        │   │   server.ts
        └───services
        │   server.ts
        
### users and permissions
```
 guest
    - this are users not logged into the platform
 
 watchmen 
    - this users has the work to verify the data but yet can add data

 novices
   - are users without permissions to add or verify data, 
   are waiting verifications or was verificated as dangerous
 
 hunters
    - this users collect informacion 
```

### Contributing

For contributions please follow  [the guide commits][6], the 
[a successful git branching model][7] and [TypeDoc][8]

#### Database

docker run -e ARANGO_NO_AUTH=1 -d --name polioramadb-no-auth arangodb -p 8529:8529

#### Run test

``` npm test ```
 
### Author

- **Andres Bayona**  - [@afbayonac](https://twitter.com/afbayonac)

### Licence

This project is licensed under the MIT License - see the [LICENSE][9] file for detail

[1]: https://img.shields.io/static/v1?label=node&message=12.13.1&color=blue&style=flat-square
[2]: https://img.shields.io/static/v1?label=npm&message=6.12.1&color=blue&style=flat-square
[3]: https://img.shields.io/npm/types/typescript?style=flat-square
[4]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square
[5]: https://standardjs.com
[6]: https://github.com/afbayonac/styleguide-git-commit-message
[7]: https://nvie.com/posts/a-successful-git-branching-model/
[8]: https://typedoc.org/
[9]: https://github.com/afbayonac/poliorama-frontend/blob/master/LICENSE