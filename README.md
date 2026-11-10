# 👾 Monster Mash!

**Monster Mash!** is een tekenapp waarmee meerdere spelers lokaal samen een monster tekenen. Elke speler tekent om de beurt een deel van het monster (hoofd, lichaam of benen). Op het einde worden alle delen samengebracht tot één uniek monster.

## Doelgroep

Kinderen van **4 tot 10 jaar**. De app moet daarom vooral gebruiksvriendelijk zijn en ook bruikbaar voor kinderen die nog niet kunnen lezen. Daarom wordt er waar mogelijk gewerkt met symbolen en tekeningen in plaats van tekst.

## Huidige functionaliteiten

- **Basis gameplay-loop**: spelers tekenen om de beurt een deel van het monster, op het einde worden de tekeningen samengebracht.
- **Meerdere spelmodi**:
  - Spelen met **drie** spelers: speler 1 tekent het hoofd, speler 2 de romp en speler 3 de benen
  - Spelen met **twee** spelers: speler 1 tekend het bovenlichaam en speler 2 het onderlichaam
  - **Alleen** spelen, met de optie om gewoon vrij te tekenen
- **Login**: gebruikers kunnen inloggen. De naam van de ingelogde gebruiker wordt getoond in het menu. (Het verschil tussen ingelogd en uitgelogd zijn is voorlopig nog beperkt.) Voor authenticatie wordt Supabase gebruikt.
    - email: hanna@ucll.be
    - wachtwoord: Password123
- **Registratie**: gebruikers registreren met een bestaand email, de confirmation mail kan enkele minuten nemen om aan te komen, de gebruiker kan hier vervolgens mee inloggen

## Roadmap

De items zijn geordend op prioriteit.

### 1. UI verbeteren
- Bevestigingsmelding toevoegen wanneer de speler op de "→"-knop in het canvas drukt (nu gaat het spel automatisch naar de volgende beurt)
- Uitleg van het spel toevoegen, met tekeningen
- Symbolen toevoegen aan alle knoppen die kinderen zelf gebruiken (menu is al in orde, startpagina nog niet)
- De "Play again"-knop op het einde van elk spel laten doorverwijzen naar het menu in plaats van het spel te herstarten
- een simpele hoofd/lichaam/benen tekening op de achtergrond van het drawingcanvas, zo weet iedereen wat te tekenen

### 2. Gebruikersfunctionaliteit
- Tekeningen rechtstreeks vanuit de app op het toestel opslaan
- Reeds gemaakte tekeningen opnieuw bekijken in de app

### 3. DrawingCanvas uitbreiden
-  Gom toevoegen
-  Uitgebreidere kleurenselectie met kleurenwiel

## Concurrentie

De voornaamste concurrent is **Gartic Phone**, een app met ook tekenspelletjes. Het grote verschil:

| | Monster Mash! | Gartic Phone |
|---|---|---|
| Multiplayer | **Lokaal** (samen op één toestel) | Online |
| Doelgroep | Kinderen van 4 tot 10 jaar | Breed publiek |
| Leesvaardigheid nodig | Nee, symbolen en tekeningen | Ja |

## Link
https://hannasiau.github.io/mobileapplications/