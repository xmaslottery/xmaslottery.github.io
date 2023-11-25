function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

(function(){
        
        
    function getHighestExtractValue() {
        let highestKey = null;
        let highestNumber = -Infinity;
      
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
        const extractedValue = splitted[1];
        return extractedValue;
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
        member.forEach(function(item, index){
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
        console.log(localStorage)
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
            selected: 1,
            running: false,
            btns: [
                 1
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
                    var ret = lottery(this.selected);
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
                    
                    
                    let color = getHighestExtractValue();                    
                    let ticketColorClass=`ticket-${color}`;
                    document.querySelector(".result").querySelector("span").classList.add(ticketColorClass);
                    setTimeout(function(){
                        //localStorage.setItem(new Date().toString(), JSON.stringify(ret));
                        $('#main').addClass('mask');
                    }, 300);
                } else {
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