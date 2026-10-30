/* SAMPLE week content. Bite types: hook, try, explain, check (mode A), self (mode B), task (mode C), reflect. */
GA.data[3]={title:"Rational functions",intentions:"I can show that a rational function models a changing cost per unit.",
days:[{day:"Mon",title:"Warm-up and review",min:0,bites:[]},
{day:"Tue",title:"Concept build-up",min:10,bites:[
{t:"hook",q:"A habal-habal charges ₱20 base + ₱10 per km. As the ride gets longer, what happens to the cost per km?",o:["Goes up","Goes down","Stays the same"],a:1,r:"Let’s test it with a slider."},
{t:"try",title:"Drag the distance",min:1,max:50,value:5,step:1,unit:"km",calc:function(v){var t=20+10*v,p=t/v;return{rows:[["Total fare","₱"+t],["Cost per km","₱"+p.toFixed(2)]],bar:Math.min(100,(p-10)/20*100),note:v<5?"Short ride: the base fare is spread over few km.":v<25?"Longer ride: the base fare is shared over more km.":"Very long: the cost per km is almost ₱10."}}},
{t:"explain",title:"That is a rational function",body:["Total fare: <code>10x + 20</code>","Cost per km: <code>f(x) = (10x + 20) / x = 10 + 20/x</code>","As x grows, <code>20/x</code> shrinks. The price per km gets close to ₱10 but never reaches it.","The distance can’t be zero, so <code>x ≠ 0</code>."]},
{t:"check",q:"What is the cost per km for an 8 km ride? (in ₱)",ans:12.5,tol:0.01,h:"Total first: 20 + 10 × 8. Then divide by 8.",e:"Total is ₱100, and ₱100 ÷ 8 = ₱12.50 per km."},
{t:"self",q:"In your own words: why does the cost per km never reach ₱10?",ans:"Because 20/x gets very small but never becomes zero, so 10 + 20/x stays above 10."},
{t:"task",q:"Make your own “base fare + per km” example from your barangay. Show the cost per km for 4 km and 20 km.",how:"Write it on paper. Send a photo to your teacher in the class group."},
{t:"reflect",q:"Where in Davao have you seen “farther is cheaper per km”?",chips:["Jeepney routes","Bulk rice","Load promos","Somewhere else"]}]},
{day:"Wed",title:"Practice lab",min:0,bites:[]},{day:"Thu",title:"Boss round and reflect",min:0,bites:[]}],
boss:[{q:"How much is the cost per km for a 5 km ride?",o:["₱14","₱70","₱10"],a:0,h:"Total first: 20 + 10 × 5. Then divide by 5.",e:"Total is ₱70, and ₱70 ÷ 5 = ₱14 per km."},
{q:"The ride gets very, very long. The cost per km gets close to…",o:["₱0","₱20","₱10"],a:2,h:"Rewrite f(x) as 10 + 20/x. What happens to 20/x?",e:"As x grows, 20/x gets tiny, so the cost approaches ₱10 but never reaches it."},
{q:"Which km value is NOT allowed in f(x) = (10x + 20)/x ?",o:["x = 20","x = 0","x = 5"],a:1,h:"What happens when you divide by zero?",e:"Division by zero is undefined, so x ≠ 0."}]};
