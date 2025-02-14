# Liste des codes d'erreur et explication

Voici la liste des codes d'erreur utilisés dans le code et leur signification :

1. **Code: 100**
   - **Erreur :** `Error {statusCode} while downloading languages`
   - **Signification :** Une erreur s'est produite lors du téléchargement de la liste des langues à partir du fichier JSON. Cela peut être dû à une mauvaise connexion réseau ou un problème avec l'URL du fichier JSON.

2. **Code: 101**
   - **Erreur :** `Error loading languages`
   - **Signification :** Une erreur s'est produite lors du chargement des langues depuis l'URL. Cela peut être dû à des problèmes de connectivité ou à une réponse invalide du serveur.

3. **Code: 102**
   - **Erreur :** `Unsupported language: {lang}`
   - **Signification :** La langue demandée n'est pas supportée ou n'est pas disponible dans le fichier JSON des langues. Cela peut se produire si la langue n'est pas définie ou incorrecte.

4. **Code: 103**
   - **Erreur :** `Error {statusCode} while downloading words`
   - **Signification :** Une erreur est survenue lors du téléchargement de la liste des mots pour la langue spécifiée. Cela peut être dû à une mauvaise connexion réseau ou à un problème avec l'URL des mots.

5. **Code: 104**
   - **Erreur :** `No words found with {length} letters in {lang}`
   - **Signification :** Aucune correspondance de mots n'a été trouvée avec le nombre de lettres spécifié dans la langue demandée. Cela peut arriver si la liste des mots ne contient aucun mot de la longueur recherchée.

6. **Code: 105**
   - **Erreur :** `Error: {message}`
   - **Signification :** Erreur générale survenue pendant l'exécution. Ce code englobe des erreurs diverses pouvant être liées à la connexion réseau, au traitement des données ou à un problème interne.
