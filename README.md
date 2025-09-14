# Discord Bot FIA - Racing Incident Moderator

## Description
Bot Discord automatique pour la modération des forums d'incidents de course. Applique automatiquement un mode lent de 1 heure sur les nouveaux forums créés dans le canal spécifique pour encourager des discussions réfléchies.

## Fonctionnalités
- ✅ Surveillance automatique de la catégorie "✴|〔 FIA 〕|✴"
- ✅ Détection des nouveaux forums dans le canal "🚧｜race-incidents"
- ✅ Application automatique du mode lent de 1 heure (3600 secondes)
- ✅ Message informatif en anglais dans chaque forum
- ✅ Gestion d'erreurs robuste

## Configuration

### Variables d'environnement requises
- `DISCORD_TOKEN` - Token du bot Discord

### Déploiement sur Railway

1. **Créer un repository GitHub**
   - Uploadez tous les fichiers de ce projet
   - Assurez-vous que le fichier .env n'est PAS uploadé (utilisez .env.example)

2. **Déployer sur Railway**
   - Connectez votre repository GitHub à Railway
   - Railway détectera automatiquement Node.js
   - Ajoutez la variable d'environnement `DISCORD_TOKEN` dans les paramètres Railway

3. **Configuration Discord**
   - Votre bot doit avoir les permissions "Manage Channels" et "Send Messages"
   - Le bot surveille uniquement les forums créés dans la catégorie et canal configurés

## Structure du bot
- **bot.js** - Fichier principal contenant toute la logique
- **package.json** - Configuration des dépendances et scripts
- **.gitignore** - Fichiers à ignorer dans git
- **.env.example** - Exemple de fichier d'environnement

## Surveillance
Le bot surveille spécifiquement :
- **Catégorie** : "✴|〔 FIA 〕|✴"
- **Canal** : "🚧｜race-incidents"
- **Action** : Mode lent de 1 heure sur les nouveaux forums

## Support
Le bot fonctionne 24/7 une fois déployé sur Railway. Aucune maintenance manuelle requise.