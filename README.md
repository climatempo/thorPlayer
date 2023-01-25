# Thor Player
Thor Player is a player developed by climatempo for use on the portal and partner sites.

# Installation
To get Thoir player working, some steps must be followed:

- The first step is to import the javascript file and css file of the player:  
 **<script src="https://climatempo.github.io/thorPlayer/dist/thor_player.js"></script>**  
 **<style src="https://climatempo.github.io/thorPlayer/dist/thor_player.css"></style>**  
 
 - The second step is to create the div where the player will be rendered: 
 ```
  <div id="picture-in-picture">
    <div id="thorPlayer"
      data-video_url="https://gr85dfk4qgzy.compat.objectstorage.sa-saopaulo-1.oraclecloud.com/ct/{{ videoThorPlayer }}.mp4"
      data-ad_tag_url="{{ adTagUrl }}"
      data-key_values="['ab', 'regiao', 'uf', 'idCidade', 'tmin', 'tmax', 'cmomento', 'tmomento', 'icoman',
      'icotar','iconoi','icodia','chuvamm','urmax','uvmax','agricola','litoranea','secao','website','vitaminaD',
      'qualidadeAr','resfriado','mosquito','raiosUV','pele']">
    </div> 
  </div>
 ```
  
  - Below is an explanation of all data attributes and tags:
  
      **data-video_url:** URL of the video that will play in the player.  
      **data-ad_tag_url:** AD manager tag to run ads in the player.  
      **data-key_values:** The key values represent the existing meta tags on the page. Your values will be sent to google tag manager. If the meta tag does not exist, the value will be ignored.  
      **Obs: The tag with the picture in picture id exists only for the player's picture in picture operation.**  
 
# Maintenance
To get Thoir player working, some steps must be followed:
To maintain and add functionality to the player you need to use the following commands: 
- `` yarn``
- `` yarn start ``  

After programming and testing, just build it with the command: ``yarn build`` and make the commits.  
When the commits arrive in the main branch automatically the deploy is done using **github pages.**  

