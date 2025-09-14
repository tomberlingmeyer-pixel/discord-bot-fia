const { Client, GatewayIntentBits, ChannelType } = require('discord.js');

// Configuration du bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

// Configuration du mode lent (1 heure = 3600 secondes)
const SLOWMODE_DURATION = 3600;
const FIA_CATEGORY_NAME = "✴|〔 FIA 〕|✴";
const RACE_INCIDENT_CHANNEL_NAME = "🚧｜race-incidents";

// Événement quand le bot est prêt
client.once('clientReady', () => {
    console.log(`Bot connecté en tant que ${client.user.tag}!`);
    console.log(`Surveillance de la catégorie: ${FIA_CATEGORY_NAME}`);
    console.log(`Canal surveillé: ${RACE_INCIDENT_CHANNEL_NAME}`);
    console.log(`Mode lent configuré: ${SLOWMODE_DURATION} secondes (1 heure)`);
});

// Événement pour détecter la création de nouveaux threads/forums
client.on('threadCreate', async (thread) => {
    try {
        // Vérifier si le thread est créé dans la bonne catégorie
        const parentChannel = thread.parent;
        if (!parentChannel) return;
        
        const category = parentChannel.parent;
        if (!category || category.name !== FIA_CATEGORY_NAME) return;
        
        // Vérifier si c'est dans le bon canal
        if (parentChannel.name !== RACE_INCIDENT_CHANNEL_NAME) return;
        
        console.log(`Nouveau forum détecté: "${thread.name}" dans ${parentChannel.name}`);
        
        // Appliquer le mode lent de 1 heure
        await thread.setRateLimitPerUser(SLOWMODE_DURATION);
        
        console.log(`✅ Mode lent de 1 heure appliqué au forum: "${thread.name}"`);
        
        // Message optionnel dans le thread pour informer
        await thread.send({
            content: `🔒 **Slowmode automatically enabled**\n\nA 1-hour delay between messages has been applied to this incident forum to encourage thoughtful and constructive discussions.\n\n*This message was sent automatically by the FIA bot.*`,
            flags: [4096] // Message éphémère si possible
        });
        
    } catch (error) {
        console.error('Erreur lors de l\'application du mode lent:', error);
    }
});

// Gestion des erreurs
client.on('error', (error) => {
    console.error('Erreur Discord:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('Erreur non gérée:', error);
});

// Connexion avec le token Discord
if (!process.env.DISCORD_TOKEN) {
    console.error('❌ Token Discord manquant! Veuillez définir la variable d\'environnement DISCORD_TOKEN');
    process.exit(1);
}

client.login(process.env.DISCORD_TOKEN);