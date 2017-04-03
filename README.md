Présentation
=========

Ce plugin est un add-on pour le framework [Avatar](https://github.com/Spikharpax/Avatar-Serveur)

Variante du plugin blague officiel

Raconte une blague aléatoire du site http://www.takatrouver.net/blagues/


## Installation

- Dézippez le fichier `Avatar-Plugin-blague-Master.zip` dans un répertoire temporaire
- Copiez le répertoire `blague` dans le répertoire `Avatar-Serveur/plugins`
- Copiez le fichier `intents/intent.blague.js`dans le répertoire `Avatar-Serveur/ia/intents/`
- Copiez le fichier `actions/action.joke.day.js` dans le répertoire `Avatar-Serveur/ia/actions/`
- Editez le fichier `Avatar-Serveur/ia/actions/index.js`, allez à la fin du fichier et juste avant `function _interopRequireDefault(obj)` ajoutez les lignes suivantes:

```javascript
var _actionJoke = require('./action.joke.day');

Object.defineProperty(exports, 'jokeOfDay', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_actionJoke).default;
  }
});

// Fin du fichier...
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
```

- Editez le fichier `Avatar-Serveur/ia/intents/index.js`, allez à la fin du fichier et juste avant `function _interopRequireDefault(obj)` ajoutez les lignes suivantes:

```javascript

var _intentBlague = require('./intent.blague');

Object.defineProperty(exports, 'blague', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_intentBlague).default;
  }
});

// Fin du fichier...
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
```

- Editez le fichier `Avatar-Serveur/ia/index.js`
	- Ajoutez dans l'import des intents, l'intention `blague`
	- Ajoutez dans l'import des actions, l'action `jokeOfDay`
	- Ajoutez dans la fonction export.intent(), l'association de l'intention-action

```javascript
import { blague, tvChannels, tvActions, music, weather, hour,  manageAvatar, shoppingList, translate, lastAction, intentEnd} from './intents';
import { jokeOfDay, freeTV, freeRules, Sonos, forecastMsn, forecastYahoo, worldHour, avatarRules, shopping, translator, backupAction, actionEnd} from './actions';


exports.intent = function () {

	// Configure the intents
	ava
	 .intent(translate, translator)
	 // Déclaration blague CI-DESSOUS !
	 .intent(blague, jokeOfDay)
	 .intent(hour, worldHour)
	 .intent(weather, [forecastYahoo, forecastMsn])
	 .intent(music, Sonos)
	 .intent(manageAvatar, avatarRules)
	 .intent(shoppingList, shopping)
	 .intent(lastAction, backupAction)
	 .intent(intentEnd, actionEnd)  // Toujours à la fin, controle si une règle est passée
}
```


## Configuration
La configuration du plugin se fait dans le fichier `Avatar-Serveur/plugins/blague/blague.prop`

## Les commandes
Toutes les syntaxes de phrases qui comprennent ces mots peuvent être utilisées. Ce ne sont pas des règles fixes.

Les règles sont définies dans le tableau de syntaxes `blague`

Une seule syntaxe est définie. La règles doit inclure les mots **blague** et **histoire**

Quelques exemples possibles:
- Raconte une blague
- Lis moi une histoire
- Une blague s'il te plait
...
   
## Versions
Version 1.0 
- Version Released
