# slideWiz - A slide-show library running on JQuery

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)

- [Usage](#usage)
- [Attributes](#attributes)

<h2 id="usage"> Usage </h2>

> slideWiz only wants to be bound with a html element as follows

```javascript 
$('.slide-container').slideWiz({
      auto: true,
      speed: 5000,
      row: 12,
      col: 35,
      animation: [
          'flip',
          'slice',
          'box3D',
          'pixel',
          'fade',
          'glide',
          'card'
      ],
      file: [
          {
              src: {
                  main: "image/main.png",
                  cover: "image/cover_1.jpg"
              },
              title: 'slideWiz Library - 1',
              desc: "1: slideWiz is a JQuery based library created by a Nigerian Software " +
              "Engineer by the name 'Wisdom Emenike' who at the time of writing this library " +
              "works at Imaxinacion Technology, one of Nigeria's leading IT companies.",
              descLength: 220,
              button: {
                  text: 'GitHub - 1',
                  url: 'https://github.com/iamwizzdom/slideWiz',
                  class: 'btn btn-medium btn-primary'
              }
          },
          {
              src: {
                  main: "image/main.png",
                  cover: "image/cover_2.jpg"
              },
              title: 'slideWiz Library - 2',
              desc: "2: slideWiz is a JQuery based library created by a Nigerian Software " +
              "Engineer by the name 'Wisdom Emenike' who at the time of writing this library " +
              "works at Imaxinacion Technology, one of Nigeria's leading IT companies.",
              button: {
                  text: 'GitHub - 2',
                  url: 'https://github.com/iamwizzdom/slideWiz',
                  class: 'btn btn-medium btn-primary'
              }
          },
          {
              src: {
                  main: "image/main.png",
                  cover: "image/cover_3.jpg"
              },
              title: 'slideWiz Library - 3',
              desc: "3: slideWiz is a JQuery based library created by a Nigerian Software " +
              "Engineer by the name 'Wisdom Emenike' who at the time of writing this library " +
              "works at Imaxinacion Technology, one of Nigeria's leading IT companies.",
              descLength: 190,
              button: {
                  text: 'GitHub - 3',
                  url: 'https://github.com/iamwizzdom/slideWiz',
                  class: 'btn btn-medium btn-primary'
              }
          },
          {
              src: {
                  main: "image/main.png",
                  cover: "image/cover_4.jpg"
              },
              title: 'slideWiz Library - 4',
              desc: "4: slideWiz is a JQuery based library created by a Nigerian Software " +
              "Engineer by the name 'Wisdom Emenike' who at the time of writing this library " +
              "works at Imaxinacion Technology, one of Nigeria's leading IT companies.",
              button: {
                  text: 'GitHub - 4',
                  url: false,
                  class: 'btn btn-medium btn-primary'
              }
          }
      ]

  });
```

<h2 id="attributes"> Attributes </h2>

> slideWiz accept an array of objects as a parameter, the object having four attributes each.

- `auto` - This attribute takes a boolean true/false, which tells slideWiz to slide automatically or not.

- `speed` - This attribute takes milliseconds as time, specifying slideWiz' slide interval.

- `animation` - This attribute takes a string or an array as it's argument. Use a string to specify the animation 
you want or an array of animation names for slideWiz to randomly choose from each time the page is loaded. 
Currently slideWiz supports seven slide animations. 
     
      1. fade
      2. card
      3. box3D
      4. glide
      5. flip
      6. slice
      7. pixel

- `col` - This attribute is used to define the number of columns needed for animations such as flip, slice and pixel.

- `row` - This attribute is used to define the number of rows needed for pixel animation

- `file` - This attribute takes an array containing objects of the slide-show content. 

> slideWiz currently accepts 4 attributes in each of the file objects as listed below.


- `src` - This takes the image url

- `title` - This takes the slide title, if not needed use a boolean 'false'

- `desc` - This takes the slide description, if not needed use a boolean 'false'

- `button` - This takes an object with 3 attributes which defines the button, if not needed use a boolean 'false'. 
     
      1. text - This takes the button title
      2. url - This takes a url you want the button to direct to when clicked
      3. class - This takes a CSS class name

> However, any of the button object attributes that are not needed should also be set to false
