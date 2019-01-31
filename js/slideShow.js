//animation list: flip, slice, box3D, pixel, fade, glide, card

$(document).ready(function () {

    $('.slideWiz').slideWiz({
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

});
