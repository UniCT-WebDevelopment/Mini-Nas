# Mini-Nas
Mini-Nas è un applicativo che permette la condivisione di dischi da remoto tramite il browser ad una determinata cerchia di utenti registrati dall'amministratore

## Requisiti
Sistema operativo linux-like avente installato il pacchetto utils-linux. Se quest'ultimo non fosse installato correttamente o fosse installato parzialmente l'app riconoscerebbe automaticamente quale funzione potrebbe essere eseguita.

## Guida d'uso
Mini-Nas comunica tramite http in rete locale alla porta 8080. L'applicativo offre tramite un account amministratore la possibilità di svolgere le seguenti azioni:
-aggiungere , rimuovere e modificare gli utenti tramite la sezione Account.
-attivare o disattivare specifiche funzioni agli utenti tramite la sezione Plugin, tranne modificare lo stato delle funzionalità che non soddisfano le proprie dipendenze
-interagire con i dischi attraverso le funzionalità fornite previa conoscenza ed inserimento della password utente che ha avviato l'applicazione tramite la sezione Storage.
-conoscenza delle informazioni del sisteme corrente si ottengo tramite la sezione System.

## Tecnologie utilizzate
- Node-Express
- Sqlite

## Avvio
node start

## Note
Questa applicazione è in versione apha ed in quanto tale non da la disponibilà agli utenti non amministratori di interagire con i dischi 
