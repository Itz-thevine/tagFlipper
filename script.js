const pathWay = '/C:/Users/TheVine/Desktop/tagFlipper/'; 

// array to contain all the images
const Images = [
    {key: 1, title:'Bicycle' , images:'resources/bicycle.png', about:'Bicycles are widely used for transportation, recreation, and sport (see cycling). Throughout the world, bicycles are essential to moving people and goods in areas where there are few automobiles.'},
    {key: 2, title:'Clock' , images:'resources/clock.png', about:'A device other than watch for indicating or measuring time commonly by means of hands moving on a dial, A Clock is any periodic system by which time is measured. It is a synchronizing devices (as in a computer) that produces pulses at regular intervals.'},
    {key: 3, title:'Car' , images:'resources/car.png', about:'A Vehicle moving on wheels: such as Carriage, Chariot. Vehicle designed to move on rails(as of railroad).'},
    {key: 4, title:'Dress' , images:'resources/dress.png', about:'A dress (also known as a frock or a gown) is a garment traditionally worn by women or girls consisting of a skirt with an attached bodice (or a matching bodice giving the effect of a one-piece garment). It consists of a top piece that covers the torso and hangs down over the legs'},
    {key: 5, title:'Football' , images:'resources/football.png', about:'Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal. Unqualified, the word football normally means the form of football that is the most popular where the word is used. Sports commonly called football include association football (known as soccer in North America and Oceania); gridiron football (specifically American football or Canadian football); Australian rules football; rugby union and rugby league; and Gaelic football. These various forms of football share to varying extent common origins and are known as football codes.'},
    {key: 6, title:'Fruit' , images:'resources/fruit.png', about:'In botany, a fruit is the seed-bearing structure in flowering plants that is formed from the ovary after flowering. Fruits are the means by which flowering plants (also known as angiosperms) disseminate their seeds. Edible fruits in particular have long propagated using the movements of humans and animals in a symbiotic relationship that is the means for seed dispersal for the one group and nutrition for the other; in fact, humans and many animals have become dependent on fruits as a source of food.'},
    {key: 7, title:'House' , images:'resources/house.png', about:'A House is a building that serves as living quarters for one or few families, it is a shelter or refuge (such as nest or den) of wild animal. It is a natural covering (such as a test or shell) that encloses and protects an animal or a colony of zooids.'},
    {key: 8, title:'Telephone' , images:'resources/phone.png', about:'A telephone is a telecommunications device that permits two or more users to conduct a conversation when they are too far apart to be heard directly. A telephone converts sound, typically and most efficiently the human voice, into electronic signals that are transmitted via cables and other communication channels to another telephone which reproduces the sound to the receiving user.'},
]

if (window.location.pathname == pathWay + 'index.html') {

    document.querySelector('.main').style.backgroundColor = sessionStorage.getItem('pageColor') ?? '#c1272d';
    document.querySelector('.srt').style.color = sessionStorage.getItem('pageColor') ?? '';
    

    //array of hex code for colors
    const colors = ['#c1272d', '#f7931e', '#ff00ff', '#fbb03b', '#8cc63f', '#39b54a', '#009245', '#006837', '#29abe2', '#0071bc', '#1b1464', '#662d91', '#93278f', '#9e005d', '#d4145a', '#c7b299', '#998675', '#736357', '#603813', '#534741'];

    //setup the auto flip nav button
    const autoFlip = document.getElementById('autoFlip');
    var mainClass = document.querySelector('.main');
    var srt= document.querySelector('.srt');


    autoFlip.addEventListener("click", function(){
        var values = value();
        mainClass.style.backgroundColor= colors[values];
        srt.style.color = colors[values]; 
        sessionStorage.setItem('pageColor', colors[values]);

        var tagArray = JSON.parse(sessionStorage.getItem('tagArray'));

         //get the arraycontent, !important
        var random = getRandom();
        //console.log(Images[random]['about']);
        const tagTitle = tagArray[random]['title'];
        const tagAbout = tagArray[random]['about'];
        const tagImage = tagArray[random]['images'];
        // // insert them into the html 
        // event.preventDefault();
        // objectTitle.innerHTML = tagTitle;
        document.getElementById('editTitle').innerHTML = tagTitle;
        document.getElementById('editAbout').innerHTML = tagAbout;
        document.querySelector('.objectImage').style.background = `url(${tagImage})`;
        document.querySelector('.objectImage').style.backgroundSize = 'contain';
        document.querySelector('.objectImage').style.backgroundRepeat = 'no-repeat';
        document.querySelector('.objectImage').style.backgroundPositionY = 'center';

        document.querySelector('.start').style.display = 'none';

        // console.log(tagArray[random]['about']);
        // console.log(random);

        function getRandom (){
           return Math.floor(Math.random()*tagArray.length)
        } 
        
        


        //objectTitle.innerHTML = Images;
    });


    
    function value (){
        return Math.floor(Math.random()*colors.length);
    }



}else{

    //javacript for the additems Page
    if(window.location.pathname == pathWay + 'addItem.html'){

        //first get the sesstion value
        let pageColor = sessionStorage.getItem('pageColor');
        // console.log(pageColor);

        //change the background color and button color
        var mainClass = document.querySelector('.main');
        var srt= document.querySelector('.add');


     

        mainClass.style.backgroundColor = pageColor ;
        srt.style.color = pageColor;

        // for the click button
        var button = document.querySelector('.button');
        var inputFile = document.querySelector('.file');
        const objectImage = document.querySelector('.objectImage');
        const getImage= document.querySelector('.getImage');
        var file;

        button.onclick = function(){
            inputFile.click();
        }

        //when you click
        inputFile.addEventListener('change', function(){
            file = this.files[0];
            objectImage.classList.add('objectImageTwo');
            getImage.style.visibility = 'hidden';  
            displayFile();
        });

        
        //add items to the array on the click of add
        var tagTitle = document.getElementById('tagTitle');
        var tagAbout = document.getElementById('tagAbout');

        //function for form validation
        function validation () {
            var validTitle = document.forms['myForm']['tagTitle'].value;
            var validAbout = document.forms['myForm']['tagAbout'].value;

            //console.log(validAbout);

            if (validTitle == '') {
                event.preventDefault();
                var error = 'Enter tag Title';
                return console.log(error);
            }else if (validAbout == '') {
                event.preventDefault()
                console.log('Enter tag Details')
            }else{
                event.preventDefault()
                
                //if the form conains content append the content to the array

                //start a session
                var inc = Images.length + 1;
                Images.push({key: inc, title: validTitle, images: '', about:validAbout });
                
                sessionStorage.setItem('tagArray', JSON.stringify(Images));

                // sessionStorage.setItem('tagArray', JSON.stringify(Images));
                // var tagArray =JSON.parse(sessionStorage.getItem('tagArray'));
                
                // console.log(tagArray);       
            }
        }

        const dropZone = document.querySelector('.imageContainer');
        
       

        

        //when file is inside the drag area
        dropZone.addEventListener('dragover', function(event){
            event.preventDefault();
            
            objectImage.classList.add('objectImageTwo');
            getImage.style.visibility = 'hidden';            
           // console.log('on it');
        });
        
        //when file leaves the drag area
        dropZone.addEventListener('dragleave', function(event){
            // console.log('left');

            objectImage.classList.remove('objectImageTwo');
            getImage.style.visibility = '';
        });

        //when the file is drop
        dropZone.addEventListener('drop', function(event){
            event.preventDefault();
            console.log('file is dropped');

            //to select the first file
            file = event.dataTransfer.files[0];
            
            displayFile();
            
        });

        function displayFile(){
            //get file type 
            let fileType = file.type;
            // console.log(fileType);

             let validExtension = ['image/jpeg', 'image/png', 'image/jpg'];

            if (validExtension.includes(fileType)) {
                //initiate file reader
                let fileReader = new FileReader();

                fileReader.onload = function(){
                    let fileURL = fileReader.result;

                    // console.log(fileURL);

                    let imgTag = `<img src ="${fileURL}" alt="">`;

                    objectImage.innerHTML= imgTag;

                };
                fileReader.readAsDataURL(file);
                
            }else{

                //error not a supported Image format
                alert('not a supported iaage format');
            }

        }

    }

}


