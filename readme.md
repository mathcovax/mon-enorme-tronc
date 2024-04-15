### Commande du projet

- Lancer le projet `npm run dev` (nécessite docker).

- Générer le client prisma `npm run generate:prisma`.

- Faire une migration Primas en DEV :
  - `npm run dev`
  - `npm run migrate:dev`

### Convention pour GIT

- Les noms des commits doivent être semblables à : `feat(${issueNumber}): subject`, `fix(${issueNumber}): subject`, `docs(${issueNumber}): subject` ...

- Les noms des branches doivent être semblables à : `feat/${issueNumber}`, `fix/${issueNumber}`, `docs/${issueNumber}` ...

### Convention pour DUPLO

- Tous les checkers doivent être créés dans le dossier `src/checkers`. Si vous importez un checker il faut utiliser le path `@checkers`.

- Toutes les `absractRoutes` et les `proccesses` concernant la sécurité (connexion, vérification supplémentaire...) doivent être créées dans le dossier `src/security`. Si vous importez depuis ce dossier, il faut utiliser le path `@security`.

- Si vous souhaitez créer un service, vous devez créer le fichier dans le dossier `src/security`. Les services doivent être des class avec des methods static. Si vous importez depuis ce dossier, il faut utiliser le path `@services`.

- Les noms des fichiers et des dossiers dans le dossier `src/routes` doivent être en `kebab-case`.

- Si vous avez une question et que Mathcovax n'est pas dispo, allez sur la [doc](https://github.com/duplojs/duplojs).

- Les variables d'ENV doivent être utiliées depuis la variable globale `ENV`.

- Les variables d'ENV sont des valeurs "sensibles" (mdp d'un compte ou autre). Définissez les dans le fichier `.env.local` qui est ignore par git.

### Convention pour VUE
- Le texte doit **impérativement** passer par i18n et non directement dans le markup.

- Les noms des composants doivent être en `PascalCase` et être minimum composés de 2 mots. Si vous n'en trouvez qu'un seul, vous pouvez le prefixer par `The`. Exemple : `Button` -> `TheButton`.

- Le dossier `src/components` contient uniquement des composants globaux. Ils ont pour but d'être flexibles et de pouvoir être utilisés à plusieurs endroits. Si vous souhaitez créer des composants qui ne seront utilisés qu'à un seul endroit, vous devez les créer dans le dossier `components` d'un domaine. Exemple de location du dossier composants d'un domaine : `src/domains/product/components`.

- Les noms des pages doivent être en `PascalCase` et être minimum composés de 2 mots. Si vous n'en trouvez qu'un seul, vous pouvez le sufixer par `Page`. Exemple : `Login` -> `LoginPage`.

- Les noms des layouts doivent être en `PascalCase` et être minimum composés de 2 mots. Si vous n'en trouvez qu'un seul, vous pouvez le sufixer par `Layout`. Exemple : `Base` -> `BaseLayout`.

- Les routes doivent être en `kebab-case`.

- Les arguments des routes doivent être en `camelCase`.

- La création d'un nouveau domain doit être disctuté en amont.

- Les pages doivent être systématiquement associées à un domaine. Exemple de location du dossier de pages d'un domaine : `src/domains/product/pages`.

- Le dossier `src/composables` contient uniquement des composables globaux. Ils ont pour but d'être flexibles et de pouvoir être utilisés à plusieurs endroits. Si vous souhaitez créer des composables qui ne seront utilisés qu'à un seul endroit, vous devez les créer dans le dossier `composables` d'un domaine. Exemple de location du dossier composables d'un domaine : `src/domains/product/composables`.

- Le dossier `src/stores` contient uniquement des stores globaux. Ils ont pour but d'être flexibles et de pouvoir être utilisés à plusieurs endroits. Si vous souhaitez créer un store qui ne sera utilisé que dans un seul domain, vous devez le créer dans le dossier `stores` d'un domaine. Exemple de location du dossier stores d'un domaine: `src/domains/product/stores`.

- Les noms des fichiers `typescript` doivent être en `camelCase`.

- Quand une fonction est bind a un event de component, la fonction doit être une `function`.

### Obtenir les Credentials Firebase

- Aller sur [cette page](https://console.firebase.google.com/u/0/project/mon-enorme-tronc).

- Une fois connecté, aller dans `⚙️` > `Paramètres du projet` > `Comptes de service`.

- Cliquer sur `Générer une nouvelle clé privée`, (cela vous téléchargera un fichier json).

- Placer le fichier json ici `duplo/firebase.credential.json`.
