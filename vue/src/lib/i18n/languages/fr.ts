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
		[routerPageName.USER_ORGANIZATIONS]: {
			title: "Mes organisations",
			emptyTitle: "Vous n'avez pas encore d'organisation.",
			emptySubtitle: "Créez ou rejoignez une organisation pour commencer à vendre vos produits.",
			table: {
				searchPlaceholder: "Chercher une organization",
				col: {
					name: "Nom",
					label: "Label",
					actions: "Actions"
				},
				action: {
					goTo: "Aller à l'organisation",
				}
			},
		},
		[routerPageName.CATEGORY_PAGE]: {
			emptyTitle: "Cette catégorie n'a pas encore de produits.",
			emptySubtitle: "Revenez plus tard pour voir les nouveautés.",
			buttonBack: "Revenir aux catégories",
			quantityProduct: "{count} produit(s) trouvé(s).",
			title: "{value}",
		},
		get [routerPageName.SEARCH_PAGE]() {
			return {
				...this[routerPageName.CATEGORY_PAGE],
				emptyTitle: "Aucun produit trouvé.",
				buttonBack: "Revenir a l'acceil.",
				title: "Resultas \"{value}\".",
			};
		},
		[routerPageName.PRODUCT_PAGE]: {
			addCartButton: "Ajouter au panier",
			label: {
				productDetails: "Détails du produit",
				comments: "Commentaires",
			}

		},
		[routerPageName.USER_CART]: {
			title: "Mon panier",
			emptyTitle: "Votre panier est vide.",
			emptySubtitle: "Commencez à ajouter des produits pour les retrouver ici.",
			browseButton: "Parcourir les produits",
			popup: {
				title: "Voulez-vous vraiment supprimer ce produit ?",
				content: "Si vous validez, ce produit sera retiré de votre panier."
			}
		},
		[routerPageName.USER_ORDER]: {
			title: "Mes commandes",
			stepTitle: {
				address: "Adresse",
				cart: "Panier",
				payment: "Paiement",
				success: "Succès",
			},
			step: {
				successMessage: "Votre commande a bien été enregistrée.",
				info: "Vos informations",
				cart: {
					title: "Votre panier",
					productName: "Nom du produit : {value}",
					price: "Prix : {value} €",
					quantity: "Quantité : {value}",
					total: "Prix total : {value} €",
				},
				payment: "Paiement",
			}
		},
		[routerPageName.ADMIN_PANEL_ORGANIZATIONS]: {
			title: "Liste des organisations",
			form: {
				title: "Créer une organisation",
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
			title: "Liste des utilisateurs",
			form: {
				primordialRole: {
					label: "Rôle Primordial",
				},
				muted: {
					label: "Rendre muet",
				},
			},
			table: {
				searchPlaceholder: "Chercher un email",
				searchPlaceholderRole: "Chercher par rôle",
			},
			btnClear: "Clear"
		},
		[routerPageName.CONTENT_PANEL_CATEGORIES]: {
			title: "Liste des catégories",
			form: {
				title: "Créer une catégorie",
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
			title: "Gestion des utilisateurs",
			form: {
				title: "Ajouter un utilisateur",
			},
			table: {
				searchPlaceholder: "Chercher un email",
			},
		},
		[routerPageName.ORGANIZATION_GET_PRODUCT_SHEET]: {
			title: "Liste des fiches produit",
			searchPlaceholder: "Chercher un produit",
			price: "Prix",
		},
		[routerPageName.ORGANIZATION_EDIT_PRODUCT_SHEET]: {
			title: "Editer la fiche produit",
			shortDescription: "Description courte",
			price: "Prix",
			form: {
				placeholder: "Chercher des catégories.",
				image: "Image du produit",
				addImage: "Ajouter une image",
				facet: {
					add: "Ajouter une Facet",
				}
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
			title: "Créer une fiche produit",
			shortDescription: "Description courte",
			price: "Prix",
			form: {
				placeholder: "Chercher des catégories.",
				image: "Image du produit",
				addImage: "Ajouter une image",
				facet: {
					add: "Ajouter une Facet",
				}
			}
		},
		[routerPageName.ORGANIZATION_GET_WAREHOUSE]: {
			title: "Liste des entrepôts",
			searchPlaceholder: "Chercher un entrepôt",
			form: {
				title: "Créer un entrepôt",
			},
			placeholder: {
				name: "nom de l'entrepôt"
			}
		},
		[routerPageName.CONTENT_PANEL_PARENT_CATEGORIES]: {
			title: "Liste des catégories parent",
			form: {
				title: "Créer une catégorie parent",
			},
			label: {
				name: "Nom de la catégorie parent",
				linkCategories: "Categories associées",
				placeholder: "Nom de la catégorie"
			},
			table: {
				name: "Nom de la catégorie parent",
				searchPlaceholder: "Chercher par le nom de la catégorie parent",
			}
		},
		[routerPageName.CONTENT_PANEL_NAVIGATION_BAR]: {
			title: "Éléments de la barre de navigation",
			form: {
				title: "Ajouter un élément",
			},
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
			title: "Liste des produits",
			table: {
				ref: "Ref",
				productSheetName: "Fiche Produit",
				lastEdit: "Modifiée le",
				status: "Status",
				warehouseName: "Entrepôt"
			},
			form: {
				title: "Ajouter un produit",
				sku: "Reference",
				skuPlaceholder: "Entrer une reference",
				productSheetLabel: "Fiche produit",
				warehouseLabel: "Entrepôt",
				productSheetPlaceholder: "Entrer une fiche produit",
				warehousePlaceholder: "Entrer un entrepôt",
			},
			searchPlaceholder: "Chercher un produit",
			popupWrongMessage: "Etes-vous sur de vouloir changer le status de cette reference ?"
		},
	},
	filters: {
		title: "Filtres",
		name: {
			price: "Prix",
			color: "Couleur",
			size: "Taille",
			diameter: "Diamètre",
			target: "Cible",
			accessory: "Accessoire",
			material: "Matériaux",
			stimulation: "Stimulation",
		},
		type: {
			range: {
				price: "{value} €"
			},
			radio: {
				undefined: "Aucun"
			}
		},
		values: {
			color: {
				red: "Rouge",
				blue: "Bleu",
				green: "Vert",
				yellow: "Jaune",
				black: "Noir",
				white: "Blanc",
			},
			size: {
				small: "Petit",
				medium: "Moyen",
				large: "Grand"
			},
			diameter: {
				"20mm": "20mm",
				"30mm": "30mm",
				"40mm": "40mm",
				"50mm": "50mm",
				"60mm": "60mm",
			},
			target: {
				man: "Homme",
				woman: "Femme",
				"man/woman": "Homme/Femme",
			},
			accessorie: {
				accessory: "Accessoires"
			},
			material: {
				wood: "Bois",
				plastic: "Plastique"
			},
			stimulation: {
				anal: "Anale",
				vaginal: "Vaginale",
				clitoral: "Clitorale",
				prostate: "Prostate"
			}
		}
	},
	layout: {
		default: {
			header: {
				home: "Accueil",
				bestSeller: "Meilleures ventes",
				new: "Contact",
				products: "Produits",
				dropdown: {
					myAccount: "Mon compte",
					editProfil: "Editer mon profil",
					myOrganizations: "Mes organisations",
					support: "Support",
					management: "Gestion",
					admin: "Administration",
					organizations: "Oorganisations",
					content: "Contenu",
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
			dropdown: {
				management: "Gestion",
				admin: "Administration",
				organizations: "Mes organisations",
				content: "Gestion du contenu",
				backHome: "Retour à l'accueil",
				logout: "Déconnexion"
			}
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
		},
		content: {
			title: "Gestion du contenu",
			nav: {
				dashboard: "Tableau de bord",
				navbar: "Barre de navigation",
				parentCategories: "Catégories parent",
				categories: "Catégories",
			},
			dropdown: {
				management: "Gestion",
				admin: "Administration",
				organizations: "Mes organisations",
				content: "Gestion du contenu",
				backHome: "Retour à l'accueil",
				logout: "Déconnexion"
			}
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
		CONTENTS_MASTER: "Gestionaire",
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
			maxLength: "Doit faire au plus {value} caractères.",
			minLength: "Doit faire au moins {value} caractères.",
			invalidEmail: "Cet email est invalide.",
			minAge: "Vous devez avoir au moins {value} ans.",
			maxItems: "Vous pouvez selectionner au plus {value} éléments.",
			blobToLarge: "L'image est superirére a {value}.",
			url: "Doit être sous la forme /path/to/page",
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
		categories: "Catégories",
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
		pay: "Payer",
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
	facetType: {
		COLOR: "Couler",
		SIZE: "Taile",
		DIAMETER: "Diamétre",
		TARGET: "Cible",
		ACCESSORY: "Accessoire",
		MATERIAL: "Marértiaux",
		STIMULATION: "Stimulation",
	},
	response: {
		organization: {
			alreadyExist: "Une organisation avec ce nom existe déjà.",
			created: "L'organisation a correctement été créée.",
			edited: "L'organisation a été modifiée avec succès.",
			hasAlreadyUser: "Cette utilisateur est déjà dans l'organisation.",
			user: {
				add: "L'utilisateur a correctement été ajouté.",
				edited: "L'utilisateur a correctement été modifié.",
				deleted: "L'utilisateur a correctement été supprimé."
			},
			image: {
				missing: "Aucune image n'a été sélectionnée.",
				edited: "L'image a été ajouté à l'organisation avec succès."
			}
		},
		user: {
			edited: "L'utilisateur a bien été modifié.", 
			notfound: "Utilisateur introuvable.",
			alreadyOwner: "l'utilisateur est déjà propriétaire d'une organisation."
		},
		category: {
			alreadyExist: "Le nom de catégorie est déjà utilisé",
			created: "La catégorie a correctement été créée.",
			edited: "La catégorie a correctement été modifiée.",
			notfound: "La catégorie n'existe pas.",
		},
		productSheet: {
			notfound: "La fiche produit n'existe pas.",
			edited: "La fiche a correctement été éditée.",
			created: "La fiche a correctement été créée."
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
			edited: "Le produit a correctement été modifié.",
			created: "Le produit a correctement été créé.",
			unavailable: "Le produit n'est pas disponible quand la quantité souéter.",
			sku: {
				alreadyUse: "Ce sku est déjà utilisé.",
			}
		},
		products: {
			unavailable: "Un ou plusieur produit dans votre panier n'est plus disponible dans les quantité que vous souhté acheter.",
		},
		article: {
			created: "Les article on bien étais ajouter au panier.",
		},
		cart: {
			quantity: {
				limit: "Vous ne pouver pas avoir plus de 15 fois le même produit dans votre panier."
			},
			article: {
				limit: "Vous ne pouvez pas avoir plus de 10 article dans votre panier."
			}
		},
		TYPE_ERROR: "L'une des données envoyées est erronée. (Erreur provenant du site)",
		NOTFOUND: "La route utilisée n'existe pas. (Erreur provenant du site)",
		INTERNAL_SERVER_ERROR: "Le serveur a eu un problème. (Erreur provenant du site)",
		WHAT_WAS_SENT_ERROR: "Le serveur a renvoyé n'importe quoi. (Erreur provenant du site)",
	}
};
