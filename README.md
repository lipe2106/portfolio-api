# Projekt i kursen JavaScriptbaserad webbutveckling
Webbtjänst/ API

Detta repository innehåller ett API skapat med hjälp av NodeJs och Express. Grundläggande funktionalitet för CRUD (Create, Read, Update och Delete) är implementerad och APIet ger möjligheten att hämta, lägga till, uppdatera och radera information om mig och min portfolio, tidigare slutprojekt, kurser vi läst under utbildningen samt mina tidigare arbetsplatser. 

## API
### Länk
APIet finns tillgängligt på följande URL: http://127.0.0.1:3000
med följande endpoints:
/user
/projects
/courses
/work

## Användning
Nedan finns beskrivet hur APIet kan användas

| Metod | Ändpunkt                     | Beskrivning                                     |
|-------|------------------------------|-------------------------------------------------|
| GET   |                              | Hämtar alla projekt, info, kurser eller jobb    |
| GET   | /{id}                        | Hämtar valt projekt, info, kurs eller jobb      |
| POST  |                              | Lagrar nytt projekt, info, kurs eller jobb      |
| PUT   | /{id}                        | Uppdaterar valt projekt, info, kurs eller jobb  |
| DELETE| /{id}                        | Raderar valt projekt, info, kurs eller jobb     |

Data returneras/ skickas med följande struktur: 

`{
  "name" : "Nytt projekt",
  "description" : "Slut projekt i kursen...",
  "link" : "http://..."
}`

Datan lagras i MongoDB i respektive collection; Users, Projects, Courses eller Works.

## Skapat av
Lina Petersson
