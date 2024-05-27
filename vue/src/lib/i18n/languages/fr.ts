export default {
	page: {
		[routerPageName.EDITO_HOME]: {
			heroTitle: "Faites vous\u00A0plaisir tout en restant naturel",
			heroSubtitle: "Des produits naturels et bio pour prendre soin de vous.",
			sectionNewTitle: "Nouveautés",
			sectionBestSellerTitle: "Meilleures ventes",
			sectionPackTitle: "Notre pack Plaisir",
			button: {
				discover: "Découvrir",
				more: "Voir plus",
			}
		},
		[routerPageName.AUTH_LOGIN]: {
			title: "Connexion",
			subtitle: "Connectez-vous pour accéder à votre compte.",
		},
		[routerPageName.AUTH_REGISTER]: {
			title: "Première visite ?",
			subtitle: "Créez un compte pour accéder à nos services.",
		},
		[routerPageName.USER_EDIT_PROFIL]: {
			title: "Mon profil",
		},
		[routerPageName.ADMIN_PANEL_ORGANIZATIONS]: {
			form: {
				name: {
					label: "Nom de l'organisation",
				},
				owner: {
					label: "Propriétaire de l'organisation",
					textButton: "Trouver un propriétaire",
					placeholder: "{'owner.bg@gmail.com...'}",
					emptyLabel: "Aucun propriétaire."
				},
			},
			table: {
				searchPlaceholder: "Chercher une organization",
				col: {
					name: "Nom",
					active: "Actif",
					actions: "Actions"
				},
				action: {
					activate: "Activer",
					suspend: "Suspendre",
				}
			},
		},
		[routerPageName.ADMIN_PANEL_USERS]: {
			form: {
				primordialRole: {
					label: "Role Primordial",
				},
				muted: {
					label: "Rendre muet",
				},
			},
			table: {
				searchPlaceholder: "Chercher une email",
				searchPlaceholderRole: "Chercher par role",
			},
			btnClear: "Clear"
		},
		[routerPageName.CONTENT_PANEL_CATEGORIES]: {
			form: {
				oldName: {
					label: "Nom actuel : {currentName}"
				},
				name: {
					label: "Nom de la catégorie",
				},
				disabled: {
					desc: "Désactiver la catégorie"
				},
				selectImage: "Sélectionner une image",
				submit: "Valider",
			},
			table: {
				searchPlaceholder: "Chercher une categorie",
				col: {
					name: "Nom",
					disabled: "Active"
				},
			}
		},
		[routerPageName.ORGANIZATION_MANAGE_USER]: {
			table: {
				searchPlaceholder: "Chercher une email",
			},
		},
		[routerPageName.ORGANIZATION_GET_PRODUCT_SHEET]: {
			searchPlaceholder: "Chercher un produit",
			price: "Prix",
		},
		[routerPageName.ORGANIZATION_EDIT_PRODUCT_SHEET]: {
			shortDescription: "Description courte",
			price: "Prix",
			form: {
				placeholder: "Chercher des catégories.",
				image: "Image du produit",
				addImage: "Ajouter une image",
			}
		},
		[routerPageName.ORGANIZATION_EDIT]: {
			form: {
				logo: "Image du logo",
				addLogo: "Ajouter un logo",
				organizationLabel: "Label de l'organisation",
			}
		},
		[routerPageName.ORGANIZATION_CREATE_PRODUCT_SHEET]: {
			shortDescription: "Description courte",
			price: "Prix",
			form: {
				placeholder: "Chercher des catégories.",
				image: "Image du produit.",
				addImage: "Ajouter une image",
			}
		},
		[routerPageName.ORGANIZATION_GET_WAREHOUSE]: {
			searchPlaceholder: "Chercher un entrepôt",
			placeholder: {
				name: "nom de l'entrepôt"
			}
		},
		[routerPageName.CONTENT_PANEL_PARENT_CATEGORIES]: {
			label: {
				name: "Nom de la catégorie parent",
				linkCategories: "Categories associées",
				placeholder: "Nom d'une catégorie"
			},
			table: {
				name: "Nom catégorie parent",
				searchPlaceholder: "Chercher par le nom de la catégorie parent",
			}
		},
		[routerPageName.CONTENT_PANEL_NAVIGATION_BAR]: {
			label: {
				priority: "Priorité",
				select: "Selectioner",
			},
			table: {
				linked: "Lier",
			},
			popup: {
				title: "Voulez-vous vraiment le supprimer ?",
				content: "Si vous validez, cet élément de la barre de navigation sera supprimé définitivement."
			}
		},
		notFound: {
			title: "404 - Page introuvable",
			description: "La page que vous cherchez n'existe pas.",
			buttonText: "Retourner à l'accueil"
		},
		[routerPageName.ORGANIZATION_MANAGE_PRODUCT]: {
			table: {
				ref: "Ref°",
				productSheetName: "Fiche Produit",
				lastEdit: "Modifiée le",
				status: "Status",
				warehouseName: "Entrepôt"
			},
			form: {
				sku: "Reference",
				skuPlaceholder: "Entrer une reference",
				productSheetLabel: "Fiche produit",
				warehouseLabel: "Entrepôt",
				productSheetPlaceholder: "Entrer une fiche produit",
				warehousePlaceholder: "Entrer un entrepôt",
			},
			searchPlaceholder: "Chercher un produit",
			popupWrongMessage: "Etes-vous sur de vouloir supprimer cette reference ?"
		},
	},
	layout: {
		default: {
			header: {
				home: "Accueil",
				bestSeller: "Meilleures ventes",
				new: "Contact",
				products: "Produits",
				dropdownAccount: {
					myAccount: "Mon compte",
					editProfil: "Editer mon profil",
					support: "Support",
					management: "Gestion",
					admin: "Administration",
					organizations: "Mes organisations",
					content: "Gestion du contenu",
					login: "Connexion",
					logout: "Déconnexion"
				},
			},
			footer: {
				slogan: "Le plaisir au naturel.",
				helpNav: {
					title: "Aide",
					clientSupport: "Support client",
					deliveryDetails: "Détails de livraison",
					generalConditions: "Conditions générales",
					confidentialityPolicy: "Politique de confidentialité",
				},
				faqNav: {
					title: "FAQ",
					account: "Compte",
					orders: "Commandes",
					payements: "Paiements",
				},
				pageNav: {
					title: "Pages",
					home: "Accueil",
					bestSeller: "Meilleures ventes",
					new: "Contact",
					products: "Produits",
				},
				copyrights: "Tous droits réservés."
			}
		},
		admin: {
			title: "Panneau d'administration",
			nav: {
				home: "Tableau de bord",
				organizations: "Organisations",
				users: "Utilisateurs",
			},
		},
		organization: {
			title: "Mon organisation",
			nav: {
				dashboard: "Tableau de bord",
				organizationEdit: "Modifier l'organisation",
				orders: "Commandes",
				products: "Produits",
				users: "Utilisateurs",
				analytics: "Analytiques",
				warehouse: "Entrepôts",
				productSheets: "Fiche produits"
			},
		}
	},
	productStatus: {
		WRONG: "SUPPRIME",
		IN_STOCK: "EN STOCK",
		SOLD: "VENDU",
		ORDER: "COMMANDE",
	},
	role: {
		CUSTOMER: "Client",
		MODERATOR: "Modérateur",
		CONTENTS_MASTER: "Géstionaire",
		ADMIN: "Administrateur"
	},
	organizationRole: {
		STORE_KEEPER: "Magasinier",
		PRODUCT_SHEET_MANAGER: "Gestionaire de fiche produit",
		ACCOUNTANT: "Comptable",
		OWNER: "Propriétaire"
	},
	toast: {
		default: "Info",
		error: "Erreur",
		seccess: "Succès",
	},
	form: {
		submit: "Valider",
		rule: {
			required: "Champ obligatoire.",
			maxLength: "Doit faire au maximum {value} caractères.",
			minLength: "Doit faire au moins {value} caractères.",
			invalidEmail: "Cette email est invalide.",
			minAge: "Vous devez avoir au moins {value} ans.",
			maxItems: "Vous pouvez en selectioner max {value}.",
			blobToLarge: "L'image est superirére a {value}.",
		}
	},
	label: {
		id: "ID",
		email: "Email",
		lastname: "Nom",
		firstname: "Prénom",
		birthDate: "Date de naissance",
		address: "Adresse",
		addressDefault: "Chercher votre adresse",
		empty: "Aucun résultat",
		terms: "J'accepte les conditions générales d'utilisation",
		user: "Utilisateur",
		role: "Rôle",
		actions: "Actions",
		description: "Descritption",
		createdAt: "Date de création",
		updatedAt: "Date de modification",
		categories: "Categories",
		image: "Image",
		type: "Type",
		title: "Titre",
	},
	placeholder: {
		address: "Cherchez votre adresse",
		search: "Chercher",
	},
	button: {
		register: "S'inscrire",
		login: "Se connecter avec Google",
		validate: "Valider",
		cancel: "Annuler",
		create: "Créer",
		close: "Fermer",
		save: "Enregister",
		send: "Envoyer",
		add: "Ajouter",
		edit: "Modifier",
		clear: "Effacer",
		remove: "Retirer",
		delete: "Supprimer",
		back: "Retour",
		backToHome: "Retourner à l'accueil",
	},
	navigationItemType: {
		PARENT_CATEGORY: "Catégorie parent",
		CATEGORY: "Catégorie",
		LINK: "Lien",
	},
	response: {
		organization: {
			alreadyExist: "Une organisation avec ce nom éxiste déjà.",
			created: "L'organisation à correctement été créer.",
			edited: "L'organisation à été modifiée avec succès.",
			hasAlreadyUser: "Cette utilisateur est déja dans l'organization.",
			user: {
				add: "L'utilisateur a correctement étais ajouter.",
				edited: "L'utilisateur a correctement étais modifier.",
				deleted: "L'utilisateur a correctement étais supprimé."
			},
			image: {
				missing: "Aucune image n'a été sélectionnée.",
				edited: "L'image à été ajouté à l'organization avec succès."
			}
		},
		user: {
			edited: "L'utilisateur a bien été modifier.", 
			notfound: "Utilisateur introuvable.",
			alreadyOwner: "l'utilisateur est déjà owner d'une organisation."
		},
		category: {
			alreadyExist: "Le nom de catégory est déjà utilisais",
			created: "La catégory a correctement étais créer.",
			edited: "La catégory a correctement étais modifier.",
			notfound: "La catégorie n'existe pas.",
		},
		productSheet: {
			notfound: "La fiche produit n'existe pas.",
			edited: "La fiche a correctement étais éditer.",
			created: "La fiche a correctement étais créer."
		},
		warehouse: {
			notfound: "l'entrepôt n'existe pas.",
			edited: "l'entrepôt a correctement été édité",
			created: "l'entrepôt a correctement été créé"
		},
		parentCategory: {
			name: {
				alreadyUse: "Une catégorie parent portant ce nom éxiste déjà."
			},
			created: "La catégorie parent a correctement été créée.",
			edited: "La catégorie parent a correctement été modifiée.",
		},
		product: {
			notfound: "Le produit n'existe pas.",
			edited: "Le produit a correctement étais éditer.",
			created: "Le produit a correctement étais créer.",
			sku: {
				alreadyUse: "Ce sku est déjà utilisais",
			}
		},
		TYPE_ERROR: "L'une des donné envoyer est éroner. (Erreur provenant du site)",
		NOTFOUND: "La route route utilisais n'existe pas. (Erreur provenant du site)",
		INTERNAL_SERVER_ERROR: "Le serveur a eu un probléme. (Erreur provenant du site)",
		WHAT_WAS_SENT_ERROR: "Le serveur a renvoyer n'importe quoi. (Erreur provenant du site)",
	}
};
