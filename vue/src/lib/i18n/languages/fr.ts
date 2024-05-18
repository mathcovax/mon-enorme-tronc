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
					label: "Nom de l'organisation",
					maxLength: "Doit faire au plus 255 caractères",
					minLength: "Doit faire au moins 2 caractères",
				},
				owner: {
					label: "Propriétaire de l'organisation",
					textButton: "Trouver un propriétaire",
					placeholder: "{'owner.bg@gmail.com...'}",
					emptyLabel: "Aucun propriétaire."
				},
				submit: "Créer",
				required: "Champ obligatoire",
			},
			table: {
				suspended: "Suspendre",
				enabled: "Activer",
				searchPlaceholder: "Chercher une organization",
				cols: {
					name: "Nom",
					id: "ID",
					suspended: "Active",
					actions: "Actions"
				},
			},
		},
		manageUser: {
			form: {
				primordialRole: {
					label: "Role Primordial",
				},
				muted: {
					label: "Rendre muet",
				},
				submit: "Valider",
			},
			table: {
				searchPlaceholder: "Chercher une email",
				searchPlaceholderRole: "Chercher une email",
				cols: {
					email: "Email",
					lastname: "Nom",
					firstname: "Prénom",
					role: "Role"
				},
			},
			btnClear: "Clear"
		},
		manageCategories: {
			form: {
				oldName: {
					label: "Nom actuel : {currentName}"
				},
				name: {
					label: "Nom de la catégorie",
					minLength: "Doit faire au moins 3 caractères",
					maxLength: "Doit faire au plus 255 caractères",
				},
				disabled: {
					desc: "Désactiver la catégorie"
				},
				submit: "Valider",
				required: "Champ obligatoire",
			},
			table: {
				searchPlaceholder: "Chercher une categorie",
				cols: {
					name: "Nom",
					disabled: "Catégorie active"
				},
			}
		}
	},
	roles: {
		CUSTOMER: "Client",
		MODERATOR: "Modérateur",
		CATEGORIES_MASTER: "Géstionaire",
		ADMIN: "Administrateur"
	},
	toast: {
		default: "Info",
		error: "Erreur",
		seccess: "Succès",
	},
	response: {
		organization: {
			alreadyExist: "Une organisation avec ce nom éxiste déjà.",
			created: "L'organisation a correctement étais créer.",
			edited: "L'organisation a correctement étais éditer",
		},
		user: {
			notfound: "Utilisateur introuvable.",
			alreadyOwner: "l'utilisateur est déjà owner d'une organisation."
		},
		category: {
			alreadyExist: "Le nom de catégory est déjà utilisais",
			created: "La catégory a correctement étais créer.",
			edited: "La catégory a correctement étais modifier.",
		}
	}
};
