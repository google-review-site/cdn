
        function removeFirstChars(text, n) {
            return text.slice(n);
        }

        let lisingReviewUrl = 'https://search.google.com/local/writereview?placeid=';
        let dataSheet = 'https://docs.google.com/spreadsheets/d/1gsv48ca2LQLHMq2Tfg2DU0VZmf-u_QbqsuW-yeyOy8M/gviz/tq?';
        let listingUrl;
        let otherLinks;
        let optForSuggestions;
        let category;
        let myReviews;
        let bsName;
        let surl = 'https://script.google.com/macros/s/AKfycbxycYaeKwkmOoPeGNPwTsApbN5ABfWaUs2sO-CXxDhQQPh1C5oJ53n-aWrZH0ccAtvE/exec';

        let url = window.location.href;
        let isd = (/ios/i.test(navigator.userAgent)) || (/android/i.test(navigator.userAgent)) ? true : false;
        if (url && url.includes('?')) {
            showHide(true, 'iconPopUp');
            showHide(false,'bodyModalId');
            //showHide(true, 'loading');
            setTimeout(() => { showHide(true, 'loading') }, 1500);
            let param = url.split('?')[1];
            let query = 'SELECT A,B,C,D,E,F,G,H,I,J WHERE A = ' + param;
            query = encodeURIComponent(query);

            var myHeaders = new Headers();
            myHeaders.append("Cookie", "1P_JAR=2024-01-31-06; AEC=Ae3NU9NVDCW5e_DGXd-84yZ5Vgyw2s4p27ZF9lefHWBnw2NO2k5vI0UC_Mc; NID=511=JGITVODkgK8cVX6hCyp1whJnXEi5rQfD7VcAjsz1w-cax2k1DUiFXM7Ar7coaQXlD7azo97xPCQgWCqINxfREHFSAI5k4E64XWBS78o4UXPxuoOoykewQjXr8DguoI91d6YBwpQu6IjwcHzPzMH-7v8kkENo0bbxJ_fcQoz3vDw");

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };


            fetch(surl + `?method=getAccount&accountId=${param}`, requestOptions)
                .then(response => response.text())
                .then(data => {
                    let dataobj = JSON.parse(data);
                        if(dataobj.status === "success"){
                            listingUrl = dataobj.result.listingUrl;
                            otherLinks = dataobj.result.links;
                            optForSuggestions = dataobj.result.showSuggestions;
                            category = dataobj.result.categoryId;
                            myReviews = dataobj.result.reviews;
                            bsName = dataobj.result.bsName;

                            document.getElementById('heading').innerText = bsName;

                            if (listingUrl && !otherLinks && !optForSuggestions) {
                                window.location.href = lisingReviewUrl + listingUrl;
                            } else if (listingUrl && !otherLinks && optForSuggestions && category) {
                                getReviewSuggestions();
                            } else if (listingUrl && otherLinks) {
                                createDivWithImage('iconContainerDiv', 'google', listingUrl);
                                let otherlinksArr = otherLinks.split('|');
                                otherlinksArr.forEach(function (item) {
                                    let data = item.split(':');
                                    createDivWithImage('iconContainerDiv', data[0], data[1]);
                                });
                                buildWhatsapp();
                                //showHide(true, 'iconPopUp');
                                showHide(true,'bodyModalId');
                                showHide(false, 'loading');
                            }
                       }else{

                       }
                    
                })
                .catch(error => console.log('error', error.message));
        }

        function handleClick(parameter) {
            
            if (!parameter) {
                parameter = lisingReviewUrl + listingUrl
            }else if(myReviews && optForSuggestions && parameter.startsWith(lisingReviewUrl)){
                getReviewSuggestions();
                return;
            }
            showHide(true, 'loading');
            setTimeout(() => { showHide(false, 'loading') }, 1500);
            window.location.href = parameter;
            showHide(true, 'iconContainerDiv');
            showHide(false, 'selectPopUp');
        }

        function closeReview(){
            showHide(true, 'iconContainerDiv');
            showHide(false, 'selectPopUp');
        }

        function buildWhatsapp(){
                
                let parent = document.getElementById('iconContainerDiv');
                let maindiv = document.createElement("div");
                maindiv.className = "fullSizeRow";

                let numberInput = document.createElement("input");
                numberInput.type = "number";
                numberInput.id = "whatsappNumber"
                numberInput.className = "whatsappInput";
                numberInput.placeholder = "Enter Number...";
                maindiv.appendChild(numberInput);

                let button = document.createElement('button');
                button.innerHTML = 'Start Chat';
                button.onclick = function(){
                    let userInput = document.getElementById("whatsappNumber").value;
                    if(!userInput || userInput === ""){
                        alert('enter whatsapp number first');
                    }else{
                        handleClick(`https://wa.me/91${userInput}`);
                    }
                };
                button.className = "whatsappBtn";
                maindiv.appendChild(button);
                parent.appendChild(maindiv)

        }

        function getYours(){
            /*<div id='poweredBy' style="
              
                width: 100%;
                display:none;
                text-align: -webkit-center;
                margin-top: 50px;
                font-size: larger;
                color: white;
                font-family: system-ui;
                "><a href="tel:+919782825454" style="
                color: currentColor;
                "> powered by @techy_cards</a></div>
            </div>*/
        }

        function createDivWithImage(containerId, name, value) {
            let divId = name;
            let src;
            let urlToNavigate;
            let isAndroid = /android/i.test(navigator.userAgent);
            let pText;

            if (name.startsWith('instagram')) {
                pText = 'Follow Us';
                src = 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/e7/32/36/e7323613-570c-c583-1a6b-425bf3bfe577/Prod-0-1x_U007emarketing-0-7-0-85-220-0.png/460x0w.webp';
                if (isAndroid) {
                    urlToNavigate = `intent://instagram.com/_u/${value}/#Intent;package=com.instagram.android;scheme=https;end`
                } else {
                    urlToNavigate = `instagram://user?username=${value}`;
                }
            } else if (name.startsWith('google')) {
                src = 'https://m.media-amazon.com/images/I/61U+0CwjkrL.jpg';
                urlToNavigate = lisingReviewUrl + listingUrl;
                //urlToNavigate = listingUrl;
                pText = 'Rate Us';
            } else if (name.startsWith('email')) {
                src = 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/bd/1f/32/bd1f324b-6127-5373-7d27-8301d80de088/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/460x0w.webp';
                urlToNavigate = `mailto:${value}`;
                pText = 'Send Email';
            } else if (name.startsWith('whatsapp')) {
                src = 'https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=w480-h960-rw';
                urlToNavigate = `https://wa.me/91${value}`;
                pText = 'Send WhatsApp';
            } else if (name.startsWith('phone')) {
                src = 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/97/c7/66/97c7668c-e422-43cc-a5aa-3debc713172f/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/460x0w.webp';
                urlToNavigate = `tel:+91${value}`;
                pText = 'Call Us';
            } else if (name.startsWith('youtube')) {
                src = 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/80/a6/88/80a68809-ae3b-4a6c-819d-1b361d846e46/logo_youtube_color-1x_U007emarketing-0-6-0-0-85-220-0.png/460x0w.webp';
                urlToNavigate = `https://www.youtube.com/@${value}`;
                pText = 'Our Youtube';
            } else if (name.startsWith('website')) {
                src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Bo4bJhBhx3Emqp7u_a-an8lNvFtE_FTcALlkSWPj5lBBilRqLUp1owZH3IPkKYPXdBU&usqp=CAU';
                urlToNavigate = 'https://'+value;
                pText = 'Our Website';
            }

            let iconDiv = document.createElement('div');
            iconDiv.id = name;
            iconDiv.className = 'icon';
            iconDiv.onclick = function () {
                handleClick(urlToNavigate);
            };
            let imgElement = document.createElement('img');
            imgElement.src = src;
            imgElement.className = 'iconImage';

            let pElement = document.createElement('p');
            pElement.innerText = pText;
            pElement.className = 'iconText';

            let container = document.getElementById(containerId);
            container.appendChild(iconDiv);
            iconDiv.appendChild(imgElement);
            iconDiv.appendChild(pElement);
        }

        function setOnClickOnLi() {
            var els = document.getElementsByClassName("reviewli");
            Array.from(els).forEach((el) => {
                el.addEventListener('click', copyToClipboard);
            });
        }

        function createli(item, reviewUl) {
            li = document.createElement('li');
            li.setAttribute('class', 'reviewli');
            item = item.replaceAll("bsName",bsName);
            li.setAttribute('title', item);
            li.innerHTML = item;
            reviewUl.appendChild(li);
        }

        function createhr(reviewUl) {
            hr = document.createElement('hr');
            reviewUl.appendChild(hr);
        }

        function getReviewSuggestions() {
            
            let reviewUl = document.getElementById('reviewulId');
            reviewUl.innerHTML = "";
            if (myReviews) {
                let myReviewsArr = myReviews.split("|");

                //code random 5 reviews

                myReviewsArr.forEach(function (item, index) {
                    createli(item, reviewUl);
                    if (index < myReviewsArr.length - 1) {
                        createhr(reviewUl);
                    }
                });
                showHide(false, 'iconContainerDiv');
                showHide(true, 'selectPopUp');
                setOnClickOnLi();

            } else {
                let reviewQuery = `SELECT C WHERE B = "${category}"`;
                reviewQuery = encodeURIComponent(reviewQuery);
                fetch(dataSheet + "sheet=reviews&tq=" + reviewQuery)
                    .then(response => response.text())
                    .then(result => {
                        let data = removeFirstChars(result, 47);
                        data = data.slice(0, -2);
                        let dataObj = JSON.parse(data).table.rows;
                        if (typeof dataObj !== 'undefined' && dataObj.length > 0) {
                            for (let i = 0; i < dataObj.length; i++) {
                                if (dataObj[i].c[0]) {
                                    createli(dataObj[i].c[0].v, reviewUl);
                                    if (i < dataObj.length - 1) {
                                        createhr(reviewUl);
                                    }
                                }
                            }
                            showHide(true, 'selectPopUp');
                            setOnClickOnLi();
                        } else {
                            window.location.href = lisingReviewUrl + listingUrl;
                        }
                    })
                    .catch(error => {
                        console.log('error in getReview', error);
                        if (listingUrl) {
                            window.location.href = lisingReviewUrl + listingUrl;
                        }
                    });
            }

        }

        function showHide(show, Id) {
            document.getElementById(Id).style = `display:${show ? 'flex' : 'none'}`;
        }


        function copyToClipboard(e) {
            copyTextToClipboard(e.currentTarget.title);
            handleClick();
        }

        function copyTextToClipboard(text) {
            var textArea = document.createElement("textarea");

            textArea.style.position = 'fixed';
            textArea.style.top = 0;
            textArea.style.left = 0;

            textArea.style.width = '2em';
            textArea.style.height = '2em';

            textArea.style.padding = 0;

            textArea.style.border = 'none';
            textArea.style.outline = 'none';
            textArea.style.boxShadow = 'none';

            textArea.style.background = 'transparent';

            textArea.value = text;

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
            } catch (err) {
                console.log('Oops, unable to copy');
            }

            document.body.removeChild(textArea);
        }