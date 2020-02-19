var rgbs = [
[245, 156, 153],
[243, 91, 83],
[103, 14, 7],
[160, 45, 11],
[181, 75, 10],
[148, 97, 24],
[206, 168, 110],
[234, 215, 185],
[250, 183, 33],
[247, 214, 133],
[146, 117, 4],
[217, 173, 4],
[186, 170, 9],
[186, 185, 173],
[191, 177, 4],
[164, 167, 117],
[115, 126, 46],
[208, 230, 74],
[41, 65, 9],
[98, 151, 33],
[150, 232, 46],
[94, 130, 62],
[112, 159, 79],
[126, 215, 67],
[116, 252, 44],
[131, 248, 102],
[146, 238, 131],
[72, 241, 43],
[55, 78, 55],
[121, 201, 125],
[57, 216, 87],
[32, 186, 66],
[34, 217, 94],
[159, 201, 174],
[1, 226, 93],
[136, 249, 188],
[89, 212, 148],
[17, 224, 117],
[88, 253, 171],
[30, 136, 88],
[127, 166, 152],
[102, 252, 198],
[28, 236, 175],
[0, 76, 63],
[2, 163, 147],
[44, 96, 92],
[53, 138, 143],
[39, 169, 177],
[28, 207, 232],
[66, 159, 223],
[76, 172, 247],
[9, 79, 151],
[62, 115, 175],
[31, 101, 201],
[175, 190, 218],
[102, 131, 202],
[131, 155, 239],
[146, 148, 156],
[82, 95, 147],
[38, 54, 201],
[28, 38, 150],
[56, 61, 232],
[79, 73, 150],
[72, 67, 113],
[34, 16, 177],
[12, 0, 97],
[150, 126, 239],
[41, 0, 202],
[153, 132, 199],
[93, 62, 163],
[181, 167, 199],
[129, 96, 169],
[128, 62, 203],
[139, 66, 221],
[152, 45, 247],
[159, 43, 237],
[201, 145, 218],
[138, 65, 155],
[163, 59, 187],
[214, 139, 215],
[199, 2, 202],
[87, 31, 86],
[98, 16, 86],
[232, 21, 203],
[42, 19, 37],
[224, 15, 172],
[204, 73, 164],
[102, 22, 75],
[235, 32, 137],
[201, 149, 173],
[193, 59, 121],
[245, 136, 170],
[93, 23, 44],
[160, 46, 76],
[131, 73, 84],
[206, 101, 121],
[195, 11, 46],
[180, 27, 39],
[205, 155, 158],
[241, 202, 203],

]

console.log(document.body);

rgbs.map((i)=>{
  const div = document.createElement('div');
  div.style.backgroundColor = 'rgb(' + i[0] + ',' + i[1] + ',' + i[2] +')'
  div.style.height = '90vh';
  div.style.width = '15px';
  div.style.display = "inline-block";
  document.body.appendChild(div);
})
