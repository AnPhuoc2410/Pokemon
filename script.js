function upDate(previewPic){
    /* In this function you should 
       1) change the url for the background image of the div with the id = "image" 
       to the source file of the preview image
   
       2) Change the text  of the div with the id = "image" 
       to the alt text of the preview image 
       */
     document.getElementById('image').style.backgroundImage=  "url(" + "'" + previewPic.src + "'" + ")"
   
     document.getElementById('image').innerHTML= previewPic.alt
     }
   
     function unDo(){
        /* In this function you should 
       1) Update the url for the background image of the div with the id = "image" 
       back to the orginal-image.  You can use the css code to see what that original URL was
   
       2) Change the text  of the div with the id = "image" 
       back to the original text.  You can use the html code to see what that original text was
       */
       document.getElementById('image').style.backgroundImage=  "url(" + "'" + "'" + ")";
   
     document.getElementById('image').innerHTML= "Hover over an image below to display here."  
     }
     function change(obj){
      var tag = document.getElementById('demo');
      tag.src = obj.src;
     }
     function unchange(){
      var tag = document.getElementById("demo");
      tag.src = "groudon.png";
     }

function myFunction( obj ){
obj.style.position="fixed";
obj.style.bottom=0;
obj.style.right=0;
obj.style.width="100px";
obj.style.height="100px";
obj.style.backgroundColor="blue";
obj.innerHTML="Right-Corner"
}