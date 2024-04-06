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
