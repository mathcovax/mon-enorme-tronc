### Commande du projet

- Lancer le projet `npm run dev` (nécésite docker).

- Généré le client prisma `npm run generate:prisma`.

### Convention pour DUPLO

- Tout les checker doivent être créer dans le dossier `src/checkers`. Si vous impoter un checker il faut utiliser le path `@checkers`.

- Toute les `absractRoutes` et les `proccesses` concernant la sécuriter (connexion, vérification suplémentaire...) doivent être créer dans le dossier `src/security`. Si vous impoter depuis ce dossier, il faut utiliser le path `@security`.

- Si vous souhétais créer un services, créer le fichier dans le dossier `src/security`. Les service doivent être des class avec des methods static. Si vous impoter depuis ce dossier, il faut utiliser le path `@services`.

- Les nom des fichier et des dossiers dans le dossier `src/routes` doivent étre en `kebab-case`.

- Si vous avez une question est que Mathcovax n'est pas dispo, aller sur la [doc](https://github.com/duplojs/duplojs).

- Les varriable d'ENV doit étre utilié depuis la variable global `ENV`.

- Les variable d'ENV qui sont des valuer "sensible" (mdp d'un compte ou autre). Définissez les dans le ficchier `.env.local` qui est ignore par git.

### Convention pour VUE

- Les noms des composants doivent être en `PascalCase` et être minimum composés de 2 mots. Si vous ne trouvez qu'un seul mots, vous pouvez le prefixer par `The`. Exemple : `Button` -> `TheButton`.

- Le dossier `src/components` contient uniquement des composants globaux. Ils ont pour but d'être flexibles et de pouvoir être utilisés à plusieurs endroits. Si vous souhaitez créer des composants qui ne seront utilisés qu'à un seul endroit, vous devez les créer dans le dossier `components` d'un domaine. Exemple de location du dossier composants d'un domaine: `src/domains/product/components`.

- Les noms des pages doivent être en `PascalCase` et être minimum composées de 2 mots. Si vous ne trouvez qu'un seul mots, vous pouvez le suffixer par `Page`. Exemple : `Login` -> `LoginPage`.

- Les noms des layouts doivent être en `PascalCase` et être minimum composés de 2 mots. Si vous ne trouves qu'un seul mots, vous pouvez le suffixer par `Layout`. Exemple : `Base` -> `BaseLayout`.

- Les route doivent être en `kebab-case`.

- Les argument des route doivent être en `camelCase`.

- la création d'un nouveau domain doit être disctuter en amont.

- Les pages doivent être systématiquement associées à un domaine. Exemple de location du dossier de pages d'un domaine: `src/domains/product/pages`.

- Le dossier `src/composables` contient uniquement des composables globales. Elles ont pour but d'être flexibles et de pouvoir être utilisées à plusieurs endroits. Si vous souhaitez créer des composables qui ne seront utilisées qu'à un seul endroit, vous devez les créer dans le dossier `composables` d'un domaine. Exemple de location du dossier composables d'un domaine: `src/domains/product/composables`.

- Le dossier `src/stores` contient uniquement des stores globaux. Ils ont pour but d'être flexibles et de pouvoir être utilisés à plusieurs endroits. Si vous souhaitez créer un store qui ne sera utilisé que dans un seul domain, vous devez le créer dans le dossier `stores` d'un domaine. Exemple de location du dossier stores d'un domaine: `src/domains/product/stores`.

- Les noms des fichier `typescript` doivent être en `camelCase`.

### Obtenir les Credentials Firebase

- Aller sur [ici](https://console.firebase.google.com/u/0/project/mon-enorme-tronc).

- Une fois connecter, allez dans `⚙️` > `Paramètres du projet` > `Comptes de service`.

- Cliquer sur `Générer une nouvelle clé privée`, (cela vous téléchargera un fichier json).

- Placer le fichier json a `duplo/firebase.credential.json`.
