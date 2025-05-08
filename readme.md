# 🎲 Character Randomizer API

Une API RESTful construite avec **Express.js** et connectée à une base de données **MySQL** pour gérer des personnages, des tags, et les relations entre eux. Le système inclut une protection des routes sensibles grâce à un **mot-clé (trigger word)** haché et vérifié via `bcrypt`.

---

## 🔧 Installation

1. **Cloner le projet**

```bash
git clone https://github.com/Formidabledu59/character-randomizer-backend.git
cd character-randomizer-backend
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer l’environnement**
   Créer un fichier `.env` à la racine :

```env
DB_HOST=localhost
DB_PORT=0000
DB_USER=root
DB_PASS=motdepasse
DB_NAME=randomiser
```

4. **Lancer le serveur localement**

```bash
node app.js
```

Le serveur écoute par défaut sur `http://localhost:3000`

---

## 📦 Endpoints CRUD

### 📁 `/characters`

| Méthode | Route            | Description                             |
| ------- | ---------------- | --------------------------------------- |
| GET     | /characters      | Liste tous les personnages              |
| GET     | /characters/\:id | Détail d’un personnage                  |
| POST    | /characters      | Créer un personnage 🔒 Trigger word     |
| PUT     | /characters/\:id | Modifier un personnage 🔒 Trigger word  |
| DELETE  | /characters/\:id | Supprimer un personnage 🔒 Trigger word |

#### Exemple POST

```json
{
  "name": "Zoro",
  "img_path": "/img/zoro.jpg",
  "description": "Un épéiste légendaire",
  "trigger": "motDePasseSecret"
}
```

---

### 📁 `/tags`

| Méthode | Route      | Description                      |
| ------- | ---------- | -------------------------------- |
| GET     | /tags      | Liste tous les tags              |
| POST    | /tags      | Créer un tag 🔒 Trigger word     |
| DELETE  | /tags/\:id | Supprimer un tag 🔒 Trigger word |

#### Exemple POST

```json
{
  "name": "shonen",
  "trigger": "motDePasseSecret"
}
```

---

### 📁 `/character-tags`

| Méthode | Route           | Description                                      |
| ------- | --------------- | ------------------------------------------------ |
| POST    | /character-tags | Lier un personnage à un tag 🔒 Trigger word      |
| DELETE  | /character-tags | Supprimer un lien personnage/tag 🔒 Trigger word |

#### Exemple POST

```json
{
  "character_id": 1,
  "tag_id": 2,
  "trigger": "motDePasseSecret"
}
```

---

## 🔍 Endpoint de Recherche

### 📁 `/search/random-by-tag/:tag`

| Méthode | Route                       | Description                                  |
| ------- | --------------------------- | -------------------------------------------- |
| GET     | /search/random-by-tag/\:tag | Renvoie un personnage aléatoire selon un tag |

#### Exemple

```http
GET /search/random-by-tag/shonen
```

---

## 🛡️ Trigger Word

### 📁 `/trigger`

| Méthode | Route    | Description                                        |
| ------- | -------- | -------------------------------------------------- |
| POST    | /trigger | Créer un nouveau trigger word (haché via `bcrypt`) |

#### Exemple POST

```json
{
  "text": "motDePasseSecret"
}
```

> ⚠️ Ce mot-clé sera requis dans **toute requête POST/PUT/DELETE** dans le champ `"trigger"` du body.

---

## 📁 Exemple `.env`

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=motdepasse
DB_NAME=randomiser
```

---

## 🚀 Exemple de Lancement

```bash
npm install
node app.js
```

Puis accéder à : [http://localhost:3000/api/characters](http://localhost:3000/api/characters)

---

## ✨ Auteur

FATHALLAH Ayoub – [GitHub](https://github.com/Formidabledu59)
