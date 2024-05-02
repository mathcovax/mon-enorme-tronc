export default {
	page: {
		login: {
			title: "Connexion",
			subtitle: "Connectez-vous pour accéder à votre compte.",
			buttonText: "Se connecter avec Google"
		},
		register: {
			title: "Première visite ?",
			subtitle: "Créez un compte pour accéder à nos services.",
			rules: {
				required: "Champ obligatoire",
				minLength: "Doit faire au moins 2 caractères",
				maxLength: "Doit faire au plus 255 caractères",
				minAge: "Vous devez avoir au moins 18 ans",
				maxAge: "Vous devez avoir au plus 130 ans"
			},
			lastname: "Nom",
			firstname: "Prénom",
			birthDate: "Date de naissance",
			email: "Adresse e-mail",
			country: "Pays",
			address: {
				label: "Adresse",
				placeholder: "Saisissez votre adresse",
				emptyLabel: "Aucune adresse trouvée",
				defaultLabel: "Sélectionnez une adresse"
			},
			terms: "J'accepte les conditions générales d'utilisation",
			buttonText: "S'inscrire"
		}
	}
};
