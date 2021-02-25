# Informationen Model <---> View
Grundablauf:
* Nachricht rein, Client ruft Listener auf
* Übergabe an den Interpreter 
* Interpreter sucht die richtige Controller-Methode aus
* Frage, wie kommen wir an die richtige Antwort im Chat, indem wir das Model 
beobachten?

* Beipiel, ein User fügt einem PlanningTask eine neue Zeit hinzu
* es gibt frei mögliche Reaktionen auf die Aktion:
    1. Angenommen, hinzugefügt
    2. Abgelehnt, TimeFrame unzureichend (inhaltliche unzureichend)
    3. Abgelehnt, Kommando falsch
    4. Angenommen, PlanningTask ist fertig

* View muss antworten, indem Zustand des Model gelesen wird.
* Da als Reaktion meist alles persistent gemacht werden muss,
werden aktuell gelesene Datei fallen gelassen, neu gelesen
und die Änderung betrachtet. 