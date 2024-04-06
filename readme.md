### Convention pour VUE

- les noms des composants doivent être en `PascalCase` et étre minimum composé de 2 mots. Si vous ne trouver qu'un seul mots, vous pouvez prefixer ce mot pas `The`. Exemple: `Button` -> `TheButton`.

- Le dossier `src/components` contient uniquement des composants global. Ils ont pour but d'être flexible et de pouvoir être utilisé à plusieurs endroits. Si vous souhaitez créer des composants qui seront utilisés à un seul endroit, vous devez les créer dans le dossier `components` d'un domaine. Exemple de location du dossier composants d'un domaine: `src/domains/product/components`.

- les noms des pages doivent être en `PascalCase` et étre minimum composé de 2 mots. Si vous ne trouver qu'un seul mots, vous pouvez sufixé ce mot pas `Page`. Exemple: `Login` -> `LoginPage`.

- les noms des layouts doivent être en `PascalCase` et étre minimum composé de 2 mots. Si vous ne trouver qu'un seul mots, vous pouvez sufixé ce mot pas `Layout`. Exemple: `Base` -> `BaseLayout`.

- les route doivent être en `kebab-case`

- les argument des route doivent être en `camelCase`.

- la création d'un nouveau domain doit étre disctuter en amont

- Les pages doivent être systématiquement associé à un domaine. Exemple de location du dossier de pages d'un domaine: `src/domains/product/pages`.

- Le dossier `src/composables` contient uniquement des composables global. Elle ont pour but d'être flexible et de pouvoir être utilisé à plusieurs endroits. Si vous souhaitez créer des composables qui seront utilisés à un seul endroit, vous devez les créer dans le dossier `composables` d'un domaine. Exemple de location du dossier composables d'un domaine: `src/domains/product/composables`.

- Le dossier `src/stores` contient uniquement des stores global. Ils ont pour but d'être flexible et de pouvoir être utilisé à plusieurs endroits. Si vous souhaitez créer un store qui sera utilisés dans un seul domain, vous devez le créer dans le dossier `stores` d'un domaine. Exemple de location du dossier stores d'un domaine: `src/domains/product/stores`.

- Les noms des fichier `typescript` doivent être en `camelCase`.

### Obtenir les Credentials Firebase

- Aller sur [ici](https://console.firebase.google.com/u/0/project/mon-enorme-tronc).

- Une fois connecter, allez dans `⚙️` > `Paramètres du projet` > `Comptes de service`.

- Cliquer sur `Générer une nouvelle clé privée`, (cela vous téléchargera un fichier json).

- Placer le fichier json a `duplo/firebase.credential.json`.
