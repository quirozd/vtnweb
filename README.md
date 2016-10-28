Web Application for OpenDaylight VTN Coordinator
================================================

This is a basic web application dedicated to test VTN coordinator configurations
and features. It supports basic configurations like vBridge, port and
vlan mappings, Boundaries, and vLinks. The web application still under construction, 
so some functions may not work properly.

## Deployment

- Copy the "vtn" file to the "webapps" file of VTN coordinator's Tomcat server (/usr/local/vtn/tomcat/webapps).
- On vtn/controller.js:line45, change the IP address to the one used by the server to listen http requests.
- Start the VTN coordinator ($ /usr/local/vtn/bin/vtn_start)
- start a web browser on http://VTN_Coordinator_IP:8083/vtn/index.html
