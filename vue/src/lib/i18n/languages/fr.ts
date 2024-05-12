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
				terms: "Vous devez accepter les conditions générales d'utilisation",
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
				placeholder: "Cherchez votre adresse",
				emptyLabel: "Aucune adresse trouvée",
				defaultLabel: "Sélectionnez une adresse"
			},
			terms: "J'accepte les conditions générales d'utilisation",
			buttonText: "S'inscrire"
		},
		createOrganization: {
			form: {
				name: {
					label: "Nom de l'organisation"
				},
				owner: {
					label: "Propriétaire de l'organisation",
					textButton: "Trouver un propriétaire",
					placeholder: "owner.bg@gmail.com...",
					emptyLabel: "Aucun propriétaire."
				},
				submit: "Créer"
			}
		}
	},
	toast: {
		default: "Info",
		error: "Erreur",
		seccess: "Succès",
	},
	response: {
		organization: {
			alreadyExist: "Une organisation avec ce nom éxiste déjà.",
			created: "L'organisation a correctement étais créer."
		},
		user: {
			notfound: "Utilisateur introuvable.",
			alreadyOwner: "l'utilisateur est déjà owner d'une organisation."
		}
	}
};
