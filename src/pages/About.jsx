import React from 'react';

function About() {
    return (
        <div>
            <h1 className='text-6xl mb-4'>Graduate Thesis System</h1>
            <p className='mb-4 text-2xl font-light'>
                Full-Stack Web Application to create some theses, search theses in details, and basic CRUD operations.
                <strong>
                    <h1>Written by Kaan YAVUZ</h1>
                </strong>

            </p>
            <p className={'text-lg text-gray-400 mx-3 my-3'}>
                Tech Stack:
            </p>
            <div className={"flex items-center"}>
                <svg className={"mx-3"} fill="#000000" width="80px" height="80px" viewBox="-3 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m5.701 18.561s-.918.534.653.714c.575.085 1.239.134 1.913.134 1.084 0 2.138-.125 3.149-.363l-.093.018c.374.228.809.445 1.262.624l.059.02c-4.698 2.014-10.633-.117-6.942-1.148z"/><path d="m5.127 15.933s-1.029.762.542.924c.687.086 1.482.136 2.289.136 1.461 0 2.884-.162 4.252-.468l-.129.024c.275.258.604.463.968.596l.02.006c-5.68 1.661-12.008.131-7.942-1.218z"/><path d="m9.966 11.475c1.158 1.333-.304 2.532-.304 2.532s2.939-1.52 1.59-3.418c-1.261-1.772-2.228-2.653 3.006-5.688 0 0-8.216 2.052-4.292 6.574z"/><path d="m16.18 20.505s.678.56-.747.992c-2.712.822-11.287 1.07-13.67.033-.856-.373.75-.89 1.254-.998.232-.059.499-.093.774-.093h.057-.003c-.952-.671-6.155 1.318-2.64 1.886 9.579 1.554 17.462-.7 14.978-1.82z"/><path d="m6.142 13.21s-4.362 1.036-1.545 1.412c.759.063 1.644.098 2.536.098 1.139 0 2.264-.058 3.372-.171l-.139.012c1.805-.152 3.618-.48 3.618-.48-.425.186-.785.382-1.126.605l.029-.018c-4.43 1.165-12.986.623-10.523-.569 1.086-.563 2.372-.893 3.734-.893h.046-.002z"/><path d="m13.966 17.585c4.502-2.34 2.421-4.588.967-4.286-.199.037-.372.085-.539.146l.023-.007c.095-.134.226-.237.379-.295l.006-.002c2.874-1.01 5.086 2.981-.928 4.56.037-.033.067-.072.089-.115l.001-.002z"/><path d="m11.252 0s2.494 2.494-2.366 6.33c-3.896 3.077-.889 4.831 0 6.836-2.274-2.052-3.943-3.858-2.824-5.54 1.644-2.468 6.197-3.664 5.19-7.627z"/><path d="m6.585 23.925c4.32.277 10.96-.154 11.12-2.198 0 0-.302.775-3.572 1.391-1.806.326-3.885.512-6.008.512-1.739 0-3.448-.125-5.121-.366l.191.023s.553.458 3.393.64z"/>
                </svg>

                <svg className={"mx-3"} width="70px" height="70px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fill-rule="evenodd">
                        <path d="M0 0h32v32H0z"/>
                        <path fill="#70AD51" d="M5.466 27.993c.586.473 1.446.385 1.918-.202.475-.585.386-1.445-.2-1.92-.585-.474-1.444-.383-1.92.202-.45.555-.392 1.356.115 1.844l-.266-.234C1.972 24.762 0 20.597 0 15.978 0 7.168 7.168 0 15.98 0c4.48 0 8.53 1.857 11.435 4.836.66-.898 1.232-1.902 1.7-3.015 2.036 6.118 3.233 11.26 2.795 15.31-.592 8.274-7.508 14.83-15.93 14.83-3.912 0-7.496-1.416-10.276-3.757l-.238-.21zm23.58-4.982c4.01-5.336 1.775-13.965-.085-19.48-1.657 3.453-5.738 6.094-9.262 6.93-3.303.788-6.226.142-9.283 1.318-6.97 2.68-6.86 10.992-3.02 12.86.002 0 .23.124.227.12 0-.002 5.644-1.122 8.764-2.274 4.56-1.684 9.566-5.835 11.213-10.657-.877 5.015-5.182 9.84-9.507 12.056-2.302 1.182-4.092 1.445-7.88 2.756-.464.158-.828.314-.828.314.96-.16 1.917-.212 1.917-.212 5.393-.255 13.807 1.516 17.745-3.73z"/>
                    </g>
                </svg>
                <svg className={"mx-3"} width="80px" height="80px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 8V7.83333C12.5 7.09695 11.903 6.5 11.1667 6.5H10C9.17157 6.5 8.5 7.17157 8.5 8C8.5 8.82843 9.17157 9.5 10 9.5H11C11.8284 9.5 12.5 10.1716 12.5 11C12.5 11.8284 11.8284 12.5 11 12.5H10C9.17157 12.5 8.5 11.8284 8.5 11M6.5 6V11C6.5 11.8284 5.82843 12.5 5 12.5C4.17157 12.5 3.5 11.8284 3.5 11M0.5 0.5H14.5V14.5H0.5V0.5Z" stroke="#000000"/>
                </svg>

                <svg className={"mx-3"} fill="#000000" width="80px" height="80px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="M11.103,10.43793a1.78593,1.78593,0,1,0,2.43957.65362A1.786,1.786,0,0,0,11.103,10.43793Zm8.0047,1.93768q-.17587-.201-.37116-.40308.13641-.14337.264-.28649c1.60583-1.80427,2.28357-3.61371,1.65558-4.70154-.60217-1.043-2.39343-1.35382-4.63593-.91779q-.33132.06482-.659.14624-.06272-.21624-.13343-.43C14.467,3.49042,13.2381,1.99921,11.98206,2,10.77765,2.00055,9.61359,3.39709,8.871,5.5575q-.10959.31969-.20276.64471-.21908-.05375-.44-.0993c-2.366-.48578-4.27167-.16584-4.89844.9226-.601,1.04376.02753,2.74982,1.52851,4.47211q.22329.25562.45922.49976c-.18542.191-.361.38189-.52465.57171-1.4646,1.698-2.05719,3.37616-1.45716,4.41541.61969,1.07348,2.49854,1.42437,4.7854.97436q.278-.05511.55292-.124.10071.35156.22095.697c.73932,2.11706,1.89685,3.46863,3.097,3.4682,1.23944-.00073,2.48194-1.45288,3.23474-3.65875.05945-.17432.11573-.35535.16907-.54175q.35514.08835.71485.1568c2.20336.41687,3.95251.089,4.55145-.951C21.28058,15.93109,20.64288,14.12933,19.10767,12.37561ZM4.07019,7.45184c.38586-.67,1.94324-.93139,3.98608-.512q.19584.04027.39838.09a20.464,20.464,0,0,0-.42126,2.67767,20.88659,20.88659,0,0,0-2.10389,1.6936q-.21945-.22695-.42718-.4649l.00006.00006C4.21631,9.46057,3.708,8.08081,4.07019,7.45184Zm3.88666,5.72809c-.51056-.3866-.98505-.78265-1.41571-1.181.43036-.39587.90515-.79059,1.41467-1.17615q-.02746.58915-.02722,1.1792Q7.929,12.59117,7.95685,13.17993Zm-.00061,3.94061a7.23675,7.23675,0,0,1-2.63971.09314,1.766,1.766,0,0,1-1.241-.65631c-.36407-.63067.11176-1.978,1.36432-3.43023q.23621-.273.48791-.53174a20.49026,20.49026,0,0,0,2.10712,1.70007,20.80226,20.80226,0,0,0,.42621,2.712Q8.21011,17.07023,7.95624,17.12054Zm7.10113-8.03936q-.50309-.317-1.01861-.61365-.5073-.292-1.0268-.56207c.593-.24933,1.17591-.46228,1.73865-.63581A18.21775,18.21775,0,0,1,15.05737,9.08118ZM9.679,5.83521c.63623-1.85114,1.57763-2.98053,2.30352-2.98084.77308-.00037,1.77753,1.21826,2.43433,3.19763q.064.19355.121.38928a20.478,20.478,0,0,0-2.52716.9712,20.06145,20.06145,0,0,0-2.519-.98194Q9.578,6.13062,9.679,5.83521ZM9.27863,7.259a18.30717,18.30717,0,0,1,1.72967.642Q9.95746,8.4433,8.96094,9.0824C9.0412,8.4444,9.148,7.83313,9.27863,7.259ZM8.9624,14.91968q.49695.31813,1.00843.61273.52174.30039,1.05737.57556a18.19577,18.19577,0,0,1-1.74445.66492C9.15161,16.1908,9.04364,15.56879,8.9624,14.91968Zm5.45569,3.14551A7.23556,7.23556,0,0,1,13.18,20.39844l-.00006.00006a1.76585,1.76585,0,0,1-1.18841.747c-.72821.00042-1.65766-1.085-2.28992-2.89545q-.11169-.32108-.20551-.648a20.10863,20.10863,0,0,0,2.52918-1.0097,20.79976,20.79976,0,0,0,2.54736.97851Q14.50141,17.81983,14.41809,18.06519Zm.36224-1.32422c-.56921-.176-1.16058-.39252-1.76214-.64551q.50867-.2677,1.02472-.56543.52955-.30579,1.0321-.62689A18.1524,18.1524,0,0,1,14.78033,16.741Zm.44629-4.74268q.00111.91095-.05688,1.82044c-.49268.33343-1.01282.659-1.554.97143-.53894.31116-1.07293.59711-1.59674.8559q-.82682-.39624-1.62176-.854-.79047-.455-1.54468-.969-.06894-.90921-.06946-1.82172l.00012.00019q-.00063-.91187.06794-1.82184c.49255-.33637,1.00891-.66168,1.54278-.96991.53632-.30969,1.077-.59442,1.61469-.85248q.81664.39688,1.60382.85065.78992.454,1.549.95868.06519.91443.06524,1.83166Zm.95673-5.09283c1.92133-.37372,3.37-.12232,3.73291.50622.3866.66962-.16748,2.1485-1.55383,3.70636l-.00006.00006q-.1149.12891-.23841.25891A20.06118,20.06118,0,0,0,15.98,9.68915a20.04054,20.04054,0,0,0-.40546-2.64893Q15.88486,6.96387,16.18335,6.90546Zm-.12988,3.8847A18.16447,18.16447,0,0,1,17.51483,11.978a18.11912,18.11912,0,0,1-1.45672,1.20831q.02325-.59391.02288-1.18842Q16.08072,11.39389,16.05347,10.79016Zm3.8681,5.78876c-.36346.63116-1.76788.89435-3.65222.53784q-.32391-.06115-.66474-.14557a20.069,20.069,0,0,0,.38746-2.68176,19.93914,19.93914,0,0,0,2.13708-1.71588q.17643.18329.33563.36487v-.00007a7.23437,7.23437,0,0,1,1.40308,2.23792A1.76563,1.76563,0,0,1,19.92157,16.57892Z"/>
                </svg>
                <svg className={"mx-3"} fill="#000000" width="80px" height="80px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <title>mysql</title>
                    <path d="M30.026 15.139c-0.082-0.006-0.177-0.010-0.273-0.010-0.484 0-0.947 0.090-1.373 0.254l0.026-0.009c-0.125 0.050-0.325 0.050-0.342 0.209 0.069 0.066 0.079 0.175 0.137 0.267 0.117 0.198 0.261 0.366 0.429 0.506l0.003 0.003c0.175 0.137 0.35 0.27 0.534 0.387 0.325 0.2 0.694 0.319 1.012 0.52 0.181 0.117 0.366 0.266 0.55 0.391 0.091 0.062 0.15 0.175 0.267 0.215v-0.025c-0.057-0.075-0.075-0.184-0.131-0.267-0.084-0.084-0.167-0.159-0.25-0.241-0.248-0.325-0.535-0.603-0.857-0.835l-0.012-0.008c-0.267-0.182-0.852-0.437-0.962-0.744l-0.016-0.018c0.218-0.031 0.412-0.077 0.599-0.139l-0.024 0.007c0.284-0.075 0.544-0.059 0.837-0.132 0.132-0.034 0.266-0.075 0.4-0.117v-0.075c-0.15-0.15-0.262-0.354-0.417-0.494-0.409-0.36-0.86-0.698-1.335-1.002l-0.045-0.027c-0.262-0.167-0.595-0.275-0.871-0.417-0.1-0.050-0.267-0.075-0.325-0.159-0.13-0.185-0.245-0.397-0.336-0.621l-0.008-0.022q-0.368-0.714-0.684-1.453c-0.144-0.383-0.287-0.697-0.448-1.001l0.023 0.047c-0.786-1.319-1.881-2.379-3.188-3.102l-0.043-0.022c-0.309-0.153-0.668-0.272-1.045-0.339l-0.025-0.004c-0.209-0.010-0.417-0.025-0.625-0.034-0.146-0.094-0.272-0.19-0.39-0.296l0.003 0.003c-0.475-0.3-1.704-0.95-2.054-0.090-0.225 0.542 0.334 1.077 0.527 1.352 0.154 0.183 0.294 0.388 0.415 0.605l0.010 0.020c0.059 0.145 0.075 0.294 0.134 0.445 0.145 0.452 0.292 0.823 0.459 1.182l-0.026-0.062c0.099 0.199 0.202 0.368 0.317 0.528l-0.008-0.012c0.067 0.091 0.182 0.134 0.209 0.284-0.086 0.181-0.153 0.391-0.19 0.61l-0.002 0.014c-0.108 0.332-0.171 0.715-0.171 1.112 0 0.621 0.153 1.206 0.423 1.72l-0.010-0.020c0.134 0.207 0.452 0.667 0.878 0.491 0.375-0.15 0.292-0.625 0.4-1.043 0.025-0.1 0.009-0.166 0.060-0.234v0.019c0.117 0.235 0.235 0.459 0.342 0.694 0.302 0.435 0.661 0.805 1.071 1.11l0.013 0.009c0.2 0.15 0.359 0.41 0.609 0.502v-0.025h-0.019c-0.057-0.062-0.12-0.117-0.189-0.164l-0.004-0.002c-0.155-0.152-0.299-0.316-0.429-0.489l-0.008-0.011c-0.326-0.44-0.636-0.938-0.905-1.461l-0.029-0.061c-0.137-0.262-0.252-0.545-0.362-0.804-0.050-0.1-0.050-0.25-0.134-0.3-0.148 0.166-0.281 0.351-0.392 0.55l-0.008 0.016c-0.128 0.373-0.212 0.804-0.234 1.251l-0 0.011c-0.034 0.009-0.017 0-0.034 0.018-0.267-0.065-0.359-0.342-0.459-0.575-0.136-0.366-0.215-0.79-0.215-1.231 0-0.356 0.051-0.7 0.147-1.025l-0.006 0.026c0.059-0.175 0.309-0.727 0.209-0.895-0.052-0.159-0.217-0.25-0.309-0.379-0.109-0.154-0.209-0.329-0.292-0.514l-0.008-0.020c-0.2-0.467-0.3-0.985-0.517-1.452-0.131-0.244-0.269-0.454-0.424-0.65l0.007 0.009c-0.165-0.191-0.317-0.404-0.449-0.63l-0.011-0.020c-0.041-0.091-0.1-0.242-0.034-0.342 0.012-0.058 0.058-0.103 0.117-0.112l0.001-0c0.11-0.090 0.419 0.027 0.527 0.077 0.317 0.12 0.59 0.261 0.843 0.427l-0.016-0.010c0.117 0.082 0.244 0.241 0.394 0.282h0.175c0.267 0.059 0.569 0.018 0.819 0.091 0.459 0.155 0.856 0.349 1.223 0.587l-0.021-0.013c1.104 0.713 1.988 1.677 2.586 2.816l0.020 0.041c0.1 0.192 0.144 0.369 0.235 0.569 0.175 0.412 0.391 0.829 0.569 1.227 0.169 0.428 0.369 0.798 0.607 1.139l-0.012-0.018c0.125 0.175 0.627 0.266 0.852 0.357 0.237 0.083 0.427 0.162 0.611 0.251l-0.037-0.016c0.287 0.175 0.567 0.375 0.837 0.567 0.137 0.095 0.554 0.304 0.579 0.472zM18.302 22.452c0 0.015 0.001 0.032 0.001 0.049 0 0.558-0.249 1.057-0.643 1.393l-0.003 0.002c-0.432 0.352-0.989 0.566-1.596 0.566-0.047 0-0.094-0.001-0.14-0.004l0.006 0c-0.739-0.010-1.419-0.25-1.976-0.651l0.010 0.007 0.296-0.595c0.429 0.24 0.939 0.389 1.481 0.41l0.006 0c0.027 0.002 0.058 0.003 0.090 0.003 0.332 0 0.641-0.104 0.894-0.281l-0.005 0.003c0.229-0.174 0.375-0.446 0.375-0.752 0-0.006-0-0.011-0-0.017v0.001c0-0.412-0.287-0.762-0.81-1.056-0.485-0.266-1.453-0.821-1.453-0.821-0.478-0.296-0.791-0.817-0.791-1.411 0-0.021 0-0.042 0.001-0.063l-0 0.003c-0.001-0.019-0.001-0.041-0.001-0.063 0-0.515 0.227-0.977 0.586-1.291l0.002-0.002c0.382-0.324 0.881-0.521 1.426-0.521 0.035 0 0.069 0.001 0.103 0.002l-0.005-0c0.009-0 0.020-0 0.031-0 0.639 0 1.234 0.191 1.73 0.52l-0.012-0.007-0.266 0.595c-0.391-0.176-0.847-0.282-1.327-0.287l-0.002-0c-0.024-0.002-0.051-0.003-0.079-0.003-0.28 0-0.538 0.098-0.74 0.262l0.002-0.002c-0.189 0.157-0.309 0.392-0.31 0.655v0c0 0.41 0.292 0.762 0.832 1.062 0.491 0.269 1.483 0.837 1.483 0.837 0.488 0.287 0.811 0.809 0.811 1.407 0 0.018-0 0.037-0.001 0.055l0-0.003zM20.374 22.983c-0.273-0.545-0.432-1.187-0.432-1.866 0-0.107 0.004-0.213 0.012-0.317l-0.001 0.014q0-2.611 1.587-2.612c0.026-0.002 0.057-0.003 0.089-0.003 0.475 0 0.892 0.248 1.129 0.622l0.003 0.005c0.271 0.542 0.43 1.182 0.43 1.858 0 0.104-0.004 0.207-0.011 0.309l0.001-0.014q0 2.632-1.587 2.634c-0.027 0.002-0.058 0.003-0.089 0.003-0.475 0-0.893-0.248-1.13-0.622l-0.003-0.005zM24.488 24.535l-1.27-0.625c0.116-0.097 0.22-0.199 0.316-0.309l0.003-0.003c0.513-0.692 0.821-1.563 0.821-2.505 0-0.109-0.004-0.217-0.012-0.324l0.001 0.014q0-3.43-2.693-3.432c-0.040-0.002-0.087-0.003-0.134-0.003-0.767 0-1.456 0.337-1.925 0.872l-0.002 0.003c-0.511 0.692-0.818 1.562-0.818 2.504 0 0.106 0.004 0.211 0.012 0.315l-0.001-0.014c-0.009 0.101-0.014 0.219-0.014 0.338 0 0.874 0.274 1.684 0.74 2.349l-0.009-0.013c0.449 0.478 1.086 0.776 1.791 0.776 0.066 0 0.131-0.003 0.195-0.008l-0.009 0.001c0.009 0 0.021 0 0.032 0 0.311 0 0.612-0.045 0.897-0.128l-0.022 0.006 1.656 0.965 0.45-0.777zM28.636 24.366h-3.287v-6.91h1.106v6.061h2.181zM13.235 19.268c-0.287 2.084-0.944 3.965-1.905 5.65l0.040-0.077c-0.385 0.741-1.113 1.257-1.968 1.34l-0.010 0.001c-0.259-0.014-0.5-0.076-0.719-0.177l0.012 0.005v-0.617c0.137 0.021 0.295 0.033 0.456 0.033 0.009 0 0.018-0 0.028-0h-0.001c0.016 0.001 0.034 0.001 0.052 0.001 0.289 0 0.554-0.105 0.758-0.28l-0.002 0.001c0.22-0.181 0.361-0.451 0.369-0.755l0-0.001c-0.053-0.438-0.154-0.837-0.299-1.214l0.012 0.034-1.267-3.944h1.137l0.909 2.949c0.162 0.416 0.256 0.898 0.256 1.401 0 0.001 0 0.002 0 0.002v-0c0.482-1.262 0.848-2.734 1.034-4.261l0.009-0.092zM8.215 24.366h-1.158q-0.049-2.761-0.337-5.511h-0.010l-1.762 5.511h-0.881l-1.75-5.511h-0.012q-0.205 2.751-0.244 5.511h-1.056q0.103-3.685 0.512-6.911h1.437l1.668 5.079h0.010l1.683-5.079h1.368q0.454 3.777 0.535 6.911zM21.505 7.879c-0.002 0-0.005-0-0.008-0-0.119 0-0.234 0.015-0.344 0.043l0.010-0.002v0.016h0.017c0.086 0.128 0.174 0.239 0.269 0.343l-0.002-0.002c0.067 0.134 0.125 0.267 0.192 0.4l0.017-0.019c0.109-0.086 0.178-0.218 0.178-0.366 0-0.018-0.001-0.035-0.003-0.053l0 0.002c-0.050-0.059-0.057-0.117-0.1-0.175-0.050-0.084-0.157-0.125-0.225-0.191z"></path>
                </svg>

                <svg className={"mx-3"} width="80px" height="80px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 3C5.63333 3 4.46667 4 4 5.99999C4.7 4.99999 5.51667 4.625 6.45 4.87499C6.98252 5.01763 7.36314 5.43155 7.78443 5.88974C8.47074 6.63613 9.26506 7.49999 11 7.49999C12.8667 7.49999 14.0333 6.49999 14.5 4.5C13.8 5.49999 12.9833 5.87499 12.05 5.62499C11.5175 5.48235 11.1369 5.06844 10.7156 4.61025C10.0293 3.86386 9.23494 3 7.5 3ZM4 7.49999C2.13333 7.49999 0.966667 8.49998 0.5 10.5C1.2 9.49998 2.01667 9.12498 2.95 9.37498C3.48252 9.51762 3.86314 9.93154 4.28443 10.3897C4.97074 11.1361 5.76506 12 7.5 12C9.36667 12 10.5333 11 11 8.99998C10.3 9.99998 9.48333 10.375 8.55 10.125C8.01748 9.98234 7.63686 9.56843 7.21557 9.11023C6.52926 8.36385 5.73494 7.49999 4 7.49999Z" stroke="#000000" stroke-linejoin="round"/>
                </svg>


            </div>


        </div>
    );
}

export default About;