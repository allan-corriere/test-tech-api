
Ce projet un test technique pour évaluer les compétences pour le développement sous le Framework NestJS.

# Tour des monuments historiques de la MEL

Pour ce projet vous devez développer le back d'une application qui permet de référencer les monuments historiques de la métropole Lilloise. Le développement de l'application front est déjà effectué ce qui implique que les points d'entrer et les objets retournés sont existants.

# API

- https://opendata.lillemetropole.fr/explore/dataset/monuments-historiques-armentieres/api/
- https://opendata.lillemetropole.fr/explore/dataset/monuments-historiques-lille/api/
- https://opendata.lillemetropole.fr/explore/dataset/liste-monuments-historiques-de-roubaix/api/


## Users Story
- L’utilisateur doit pouvoir récupérer la liste de tous les monuments. 
- L’utilisateur doit pouvoir effectuer des filtres sur la liste des monuments.
    - Date par décennie
    - Localisation et rayon
    - Ville
    - Type
    - Id
    - meilleur
- L’utilisateur doit pouvoir récupérer la liste des types de monument
- L’utilisateur doit pourvoir ajouter des monuments en tant que favori.


## GET /monuments/
Récupère la liste des monuments, possibilité d’appliquer un filtre sur différentes variables

### Paramètre de filtre : 
| nom  	| type 	| info 	|
|------	|------	|------	|
| date  |	String |	Décennie de création du monument (ex : 1880 ou 1950…) |
| lat   |	Number |	Latitude du monument |
| long  |	Number |	Longitude du monument |
| radius    |	Number | 	Rayon de recherche en mètre |
| type  |	String |	Type de monument |
| ville |	String |	Ville du monument |

### Valeur de retour


| nom  	| type 	| info 	|
|------	|------	|------	|
| id |	String |	Identifiant unique du monument|
| lat |	Number |	Latitude du monument|
| long |	Number |	Longitude du monument|
| type |	String |	Type du monument|
| date |	Number |	Date de construction|
| ville |	String |	Ville du monument|

    
## POST /best_monument/


### Paramètre
| nom  	| type 	| info 	|
|------	|------	|------	|
|id |	String |	Identifiant du monument à ajouter |

### Valeur de retour 
| nom  	| type 	| info 	|
|------	|------	|------	|
| id |	String | 	Identifiant unique du monument |
| lat |	Number | 	Latitude du monument |
| long |	Number | 	Longitude du monument |
| type |	String | 	Type du monument |
| date |	Number | 	Date de construction |
| ville |	String | 	Ville du monument |


## GET /types/
### Valeur de retour

| nom  	| type 	| info 	|
|------	|------	|------	|
|id | 	String |	Identifiant du type |
|type | 	String |	Type de monument |


# Remarques / améliorations possibles

- J'ai commit tout l'exercice d'un coup, une bonne pratique est de fragmenter le travail en commits atomiques afin de simplifier la review et la gestion de la versionisation
- Charger toutes les entitées au démarrage de l'application dans une BDD (ex. SQLite) et utiliser la BDD comme source de data dans le provide. Cela m'aurait aussi permis d'utiliser des DTOs
- Probablement créer un module `monument` et un module `type` afin de séparer les usages, mais cela n'aurait pas collé aux specs
- Je ne savais pas vraiment quoi faire avec le `POST /best_monument`. Idem avec le paramètre de filtre `radius` pour la route `GET /monuments`
- La fonction de filtre peut être améliorée (notamment au niveau des parse) (les filtres auraient été plus simples avec des requêtes SQLite)
- J'ai vu (bien trop tard) qu'on pouvait ajouter des clauses `where` au moment de fetch les API de la MEL, cela aurait été beaucoup plus simple pour les filtres...