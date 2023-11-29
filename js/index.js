function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

(function(){
    function getPosition(offset) {
        let highestKey = null;
        let highestNumber = -Infinity;
        let extractedValue=0;
       try{
            // Iterate through all keys in localStorage
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);

                // Check if the key matches the pattern 'extract' followed by a number
                if (key && key.startsWith('extract')) {
                const extractNumber = parseInt(key.replace('extract', ''), 10);
                
                // Update the highest number and corresponding key
                if (!isNaN(extractNumber) && extractNumber > highestNumber) {
                    highestNumber = extractNumber;
                    highestKey = key;
                    
                }
                }
            }

            highestNumber-=offset;
            highestNumber=getCookie("totalprizes")-highestNumber;
       }
        catch{
            
        }
        return highestNumber;
      }    
    function getColor(offset) {
        let highestKey = null;
        let highestNumber = -Infinity;
        let extractedValue=0;
       try{
            // Iterate through all keys in localStorage
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);

                // Check if the key matches the pattern 'extract' followed by a number
                if (key && key.startsWith('extract')) {
                const extractNumber = parseInt(key.replace('extract', ''), 10);
                
                // Update the highest number and corresponding key
                if (!isNaN(extractNumber) && extractNumber > highestNumber) {
                    highestNumber = extractNumber;
                    highestKey = key;
                    
                }
                }
            }

            highestNumber-=offset;
            extractionkey = "extract"+highestNumber;
            const highestValue = highestKey ? localStorage.getItem(extractionkey) : null;
            const splitted = highestValue.split(' - ');       
            extractedValue = splitted[1];
       }
        catch{
            
        }
        return extractedValue;
      }     
    function getHighestExtractValue() {
        let highestKey = null;
        let highestNumber = -Infinity;
        let extractedValue=0;
       try{
            // Iterate through all keys in localStorage
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);

                // Check if the key matches the pattern 'extract' followed by a number
                if (key && key.startsWith('extract')) {
                const extractNumber = parseInt(key.replace('extract', ''), 10);
                
                // Update the highest number and corresponding key
                if (!isNaN(extractNumber) && extractNumber > highestNumber) {
                    highestNumber = extractNumber;
                    highestKey = key;
                }
                }
            }

            // Retrieve the value corresponding to the highest key
            const highestValue = highestKey ? localStorage.getItem(highestKey) : null;
            const splitted = highestValue.split(' - ');       
            extractedValue = splitted[1];
       }
        catch{
            
        }
        return extractedValue;
      }
      function getNumberExtractions() {
        let highestKey = null;
        let highestNumber = -1;
        let extractedValue=0;
        let extractNumber=0;
       try{
            // Iterate through all keys in localStorage
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);

                // Check if the key matches the pattern 'extract' followed by a number
                if (key && key.startsWith('extract')) {
                extractNumber = parseInt(key.replace('extract', ''), 10);
                
                // Update the highest number and corresponding key
                if (!isNaN(extractNumber) && extractNumber > highestNumber) {
                    highestNumber = extractNumber;
                    highestKey = key;
                }
                }
            }

            
       }
        catch{
            
        }
        return highestNumber+1;
      }
    var choosed = JSON.parse(localStorage.getItem('choosed')) || {};
    
    var speed = function(){
        return [0.1 * Math.random() + 0.01, -(0.1 * Math.random() + 0.01)];
    };
    var getKey = function(item){
        return item.name + '-' + item.phone;
    };
    var createHTML = function(){
        var html = [ '<ul>' ];
        const filteredArray=filterMembers(member)
        filteredArray.forEach(function(item, index){
            item.index = index;
            var key = getKey(item);
            var color = choosed[key] ? 'yellow' : 'white';
           //html.push('<li><a href="#" style="color: ' + item.color + ';">' + item.name + '</a></li>');
           let coloreitem="white";
           switch(item.color){
            case 'verde':
                coloreitem="#99FFCC";
                break;
            case 'bianco':
                coloreitem="white";
                break;
            case 'azzurro':
                coloreitem="#ABF0FA";
                 break;
            case 'rosa':
                coloreitem="#F7C7F7";
                break;
            case 'giallo':
                coloreitem="#FAF5AA";
                break;
        
           }
           html.push(`<li><a  style="color: ${coloreitem}">${item.name}</a></li>`);
           
        });
        html.push('</ul>');
        return html.join('');
    };
    var lottery = function(count){
        if(!localStorage.getItem('counter')) {localStorage.setItem("counter",0); }
        var list = canvas.getElementsByTagName('a');
        var color = 'yellow';
        var ret = member
            .filter(function(m, index){
                m.index = index;
                return !choosed[getKey(m)];
            })
            .map(function(m){
                return Object.assign({
                  score: Math.random()
                }, m);
            })
            .sort(function(a, b){
                return a.score - b.score;
            })
            .slice(0, count)
            .map(function(m){
              choosed[getKey(m)] = 1;
              //list[m.index].style.color = color;

              totalcount=Number(localStorage.getItem("counter"));
              localStorage.setItem("counter", totalcount+1);
              localStorage.setItem(`extract${totalcount}`,`${m.name} - ${m.color}`)
              return m.name
              //return m.name + '<br/>' + m.color ; 
            });
            
        localStorage.setItem('choosed', JSON.stringify(choosed));
        
        return ret;
    };
    var canvas = document.createElement('canvas');
    canvas.id = 'myCanvas';
    canvas.width = document.body.offsetWidth;
    canvas.height = document.body.offsetHeight;
    document.getElementById('main').appendChild(canvas);
    new Vue({
        el: '#tools',
        data: {
            selected: getCookie("batch"),
            running: false,
            btns: [
                getCookie("batch")
            ]
        },
        mounted () {
            canvas.innerHTML = createHTML();
            TagCanvas.Start('myCanvas', '', {
                textColour: null,
                initial: speed(),
                dragControl: 1,
                textHeight: 14
            });
        },
        methods: {
            reset: function(){
                if(confirm('Resettare la cronologia di estrazioni?')){
                    localStorage.clear();
                    location.reload(true);
                    localStorage.setItem("counter",0);
                    document.cookie = "batch=4";
                }
            },
            onClick: function(num){
                $('#result').css('display', 'none');
                $('#main').removeClass('mask');
                this.selected = num;
                
                  
                  
            },
            toggle: function(){

                
                if(this.running){
                    
                    TagCanvas.SetSpeed('myCanvas', speed());
                    var ret = lottery(getCookie("batch"));
                    if (ret.length === 0) {
                        $('#result').css('display', 'block').html('<span>END</span>');
                        
                        
                        return
                    }
                    $('#result').css('display', 'block').html('<span>' + ret.join('</span><span>') + '</span>');
                    TagCanvas.Reload('myCanvas');
                    let counter = 0;
                    const totalIterations = 12;
                    const intervalId = setInterval(function() {                    
                        confetti({
                            angle: randomInRange(55, 125),
                            spread: randomInRange(50, 70),
                            particleCount: randomInRange(50, 100),
                            origin: { y: 0.6 }
                          });
                    counter++;                    
                    if (counter >= totalIterations) {
                        clearInterval(intervalId);                         
                    }
                    }, 100);
                    
                    
                    
                    let tickets=  document.querySelector(".result").querySelectorAll("span");
                    let offset=getCookie("batch")-1;
                    for(ticket of tickets){
                        let color = getColor(offset); 
                                       
                        let ticketColorClass=`ticket-${color}`;

                        ticket.classList.add(ticketColorClass);
                        const spanElement = document.createElement('a');
                        spanElement.className = 'position-indicator';
                        spanElement.innerHTML = getPosition(offset);
                        ticket.appendChild(spanElement);
                        
                        offset-=1;
                    }
                    setTimeout(function(){
                        //localStorage.setItem(new Date().toString(), JSON.stringify(ret));
                        $('#main').addClass('mask');
                    }, 300);
                } else {

                    let remainingPrizes=getCookie("totalprizes")-getNumberExtractions();
                    if (remainingPrizes<1) return;
                    if(remainingPrizes<=getCookie("batch") ) document.cookie = "batch=1";





                    $('#result').css('display', 'none');
                    $('#main').removeClass('mask');
                    TagCanvas.SetSpeed('myCanvas', [5, 1]);
                }
                this.running = !this.running;
            }
        }
    });
})();
document.querySelector(".tools").classList.remove("invisible");


function filterMembers(member) {
    let members_filtered = [];
    
    if (member.length <= 700) {
      members_filtered = [...member];
    } else {
      let shuffled = member.sort(() => Math.random() - 0.5);
      members_filtered = shuffled.slice(0, 700);
    }
  
    return members_filtered;
  }