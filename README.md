# Auto-Appel
## I - Utilisation 
### Requirements : 
- Node >= 14.0.0 
- Python >= 3.9.0 
- CMake
### Installation : 
Dépendances Node : 
Pour installer ce projet, il suffit simplement de cloner le repo : sur github, cliquer sur Code, puis Download ZIP. Il suffit ensuite d'extraire ce fichier. Puis, il faut installer les dépendances. Pour cela, lancer depuis le chemin racine du projet la commande suivante : 

	npm install
Pour utiliser l'environnement de dev, naviguer dans le dossier `/dev/` puis lancer la commande précédente une nouvelle fois. (**NOTE : Il faut avoir installé les dépendances dans le dossier racine et celles dans le dossier `/dev/`pour pouvoir utiliser l'environnement dev**) 

Dépendances Python : 
Lancer les commandes suivantes (depuis n'importe quel emplacement) : 

	pip install face_recognition 
	pip install opencv-python 
### Lancer le projet : 
Naviguer dans le dossier racine du projet, et lancer la commande suivante : 

	npm run start 
Lorsque la ligne suivante apparaît, le site est opérationnel : 

	Listening on : locahost:3001 
Le serveur sera donc accessible à l'adresse **localhost:3001**. Vous pouvez changer cette adresse en modifiant le fichier `server.ts`, à la 3e ligne, le port et l'url. 
## Base de données 
Les différentes bases de données sont situées dans le dossier `database/`. Pour ajouter une classe ou un élève, cela se passe à travers l'interface. Sinon, vous pouvez les ajouter, les retirer ou les modifier en éditant le fichier `classes.json` (il est minifié, il faut utiliser un site tel que [jsonformatter.org](https://jsonformatter.org/json-pretty-print) pour le rendre lisible. 
### Format 
Les données sont au format JSON, et sont de la forme suivante :
**classData** : id : un entier unique name : une chaîne de caractères qui sera utilisée comme nom d'affichage level : "Term", "Prem" ou "Seco", indique si la classe est située dans la sous-catégorie Terminale, Première ou Seconde. students : une liste des élèves, au format _students_ 
**students** : firstName : chaîne de caractères, le prénom de l'élève lastName : pareil, mais cette fois ci le nom de famille photoPath : le nom de la photo identifiant l'élève, par défaut étant [prénom]_[nom], avec les deux en minuscule et en remplaçant les espaces par des tirets du huit. 
### Photos 
Pour ajouter une ou des images à une classe, exécuter la commande suivante dans le dossier `/scripts/` :

	py takeimages.py [id]
En remplacant _[id]_ par l'identifiant de la classe. Une fenêtre s'ouvrira, et ensuite il suffit d'appuyer sur espace pour prendre une photo. Appuyez sur échap pour fermer la fenêtre.
Ensuite, il suffit d'aller dans le dossier `/database/ref_photos/[id]` et changer les noms des images à *prénom_nom*, avec tout en minuscule et les espaces remplacés par des _.

## II - Architecture et explications
Pour lancer l'environnement de dev, lancer la commande suivante dans le dossier `/dev/` :

	npm run init_dev
Ceci va lancer à la fois le backend et le frontend, dans deux fenêtres séparées.
### Backend
Le backend est entièrement en TypeScript. Il est situé dans le fichier `server.ts`, dans le dossier racine du projet.
Les différents types custom (*classData, students, pythonRecording*) utilisés sont stockés dans le fichier `types.ts`. La base de données est accessible uniquement à travers des différentes méthodes du fichier `database_interface.ts` :

	getAllClasses() 				: async, renvoie le nom, identifiant et niveau de toutes les classes de la bdd.
	getDatabaseEntireClass(id) 		: async, renvoie toutes les données d'une classe
	setClassStudents(id, élèves) 	: change les élèves d'une classe
	readClassDatabase(id)		    : (internal) async, renvoie toutes les données d'une classe
	writeToClassDatabase(id, classe): (internal), écrase les données d'une classe
	addClassToDatabase(class) 		: async, ajoute une classe à la bdd
	sanitizeStudentName(string) 	: (internal) renvoie une chaîne de caractères formatée
	addStudentToDatabase(id, nom, prénom) : async, ajoute un élève à une classe

#### Interactions avec le backend :
Voici les différentes requêtes possibles :

	/launchPythonCamera : POST, lance l'enregistrement
	/stopPythonCamera : GET, arrête l'enregistrement
	/startRecognitionProcess : POST, lance l'identification
	/stopRecognitionProcess : POST, arrête l'identification
	/getDabaseEntireClass : GET, récupère toutes les données d'une classe
	/getClassesFromLevel : GET, récupère tous les noms de classes d'un niveau
	/addClassToDatabase : POST, ajoute une classe
	/addStudentToDatabase : POST, ajoute un élève

### Frontend
Le frontend est entièrement en React.
Voici les différents modules utilisés dans les pages :

	Add.js
	  /addClass/buttons.js : Les boutons Ajouter une personne et Ajouter une classe
	  /addClass/addClassDialog.js : Le menu pour ajouter une classe
	  /addClass/addStudentDialog.js : De même pour les élèves
	  /addClass/responseSnackbar.js : La popup indiquant l'état de réussite de la communication avec le serveur
	  /addClass/snackbar.js : La popup d'erreur indiquant si une classe a été sélectionnée

	Class.js
	  /class/display_grid.js : La grille d'appel
	  /class/class_display.js : Le header dans la page d'appel
	  
	Home.js
	  /record/level_select.js : L'input pour choisir le niveau
	  /record/class_select.js : L'input pour choisir la classe
	  /record/record.js : Les boutons pour lancer l'enregistrement
		  /recordingProgressbar.js : La barre de chargement pendant l'enregistrement
	  /identify/main.js : La barre de chargement pour l'identification des élèves
	  /stepper/main.js : Le stepper situé en bas de la page

	navbar.js : la barre de navigation

Pour build l'application react, lancer la commande suivante dans le dossier `/dev/` :
	
	npm run build

### Scripts Python :
Localisés dans `/scripts/`, voici les fonctions de ces trois scripts :

- `takeimages.py` : Permet de prendre des images facilement à l'aide de la caméra
- `record.py` : Capture une vidéo et détecte les visages, puis stocke les images dans `/database/temp_photos/[id]`
- `reconnaissance.py` : Parcours les photos prises par le script précédent et les compare aux images de référence.