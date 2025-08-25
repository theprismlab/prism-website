<template>
    <v-card class="hbspt-form-card elevation-1 px-12 py-6 my-12" style="max-width: 100%; width: 100%;">
        <div class="hbspt-form" id="hbspt-form-31184627-79a8-4973-9ed3-8cfe47d1cdd3" v-once></div>
    </v-card>
</template>

<script>
  export default {
    name: "HubspotFormV1",
    mounted() {
        const script = document.createElement("script");
        script.src="https://js.hsforms.net/forms/v2.js";
        document.body.appendChild(script);
        script.addEventListener("load", () => {
            if (window.hbspt) {
                window.hbspt.forms.create({
                    portalId: "23265540",
                    formId: "2a0b0448-c46f-4bd0-9ba5-84520afafd68",
                    target: "#hbspt-form-31184627-79a8-4973-9ed3-8cfe47d1cdd3",
                    onFormReady: function() {
                        const paragraphs = document.querySelectorAll("p");
                        paragraphs.forEach(paragraph => {
                            if (paragraph.innerHTML === "Interested in collaborating? Tell us more about your project:") {
                                // Do something with the paragraph
                                const parentDiv = paragraph.closest('div');
                                if (parentDiv) {
                                    parentDiv.remove();
                                }
                            } 
                        });
                    
                    },
                });
            }
        });
    }
}
</script>
<style>
/* this styling is originally from Samba website hubspot form, I have copied and pasted the source code and css for the form here. To modify the form, I am not sure where that is done, assuming hubspot portal has the form content defined somewhere there. */
.hbspt-form{
    max-width: none !important;
}
.hbspt-form ul.no-list, .hbspt-form .inputs-list {
    list-style: none;
    padding: 0;
}
.hbspt-form .hs-richtext {
  font-family: Inter, Sans-Serif !important;
  font-size: var(--body-1-size) !important;
  line-height: var(--body-1-line-height) !important;
}
.hbspt-form label, 
.hbspt-form input {
    font-family: Inter, Sans-Serif !important;
    font-size: var(--body-1-size) !important;
    line-height: var(--body-1-line-height) !important;
    font-weight: 600;
}


.hs-main-font-element p{
  font-size: var(--h4-size) !important;
  line-height: var(--h4-line-height) !important;
}

.form-columns-2{
    flex: 1 1;
    display: flex;
    justify-content: space-between;
}

.hbspt-form .hs-firstname, 
.hbspt-form .hs-lastname {
    max-width: 49%;
    margin-right: 4x;

}
.hbspt-form .input input  {
    background-color: #f2f2f2;
    border-bottom: 1px solid #dadada;
}

.hbspt-form .input {
    width: 100% !important;
    margin-right: 0px !important;
    margin-top:0px !important;
    margin-bottom: 0px !important;
}
.hbspt-form .submitted-message p{
  font-size: var(--h4-size) !important;
  line-height: var(--h4-line-height) !important;
  font-weight: 900 !important;
}

.hbspt-form input[type=text], 
.hbspt-form input[type=email] {
    height: 32px;
    width:100% !important;
    padding: 0 .625rem;
    font-weight: 300 !important;
}


.hbspt-form input[type=radio] {
    margin-right: 10px;
    font-weight: 300 !important;
}

.hbspt-form input::placeholder, .hbspt-form input::-webkit-input-placeholder {
    color: #cccccc;
    color: rgba(144, 144, 144, .6);
}

/* .hbspt-form fieldset .hs-input{
    max-width: 100% !important;
} */

.hbspt-form .hs-submit {
    margin: 0px 0px 24px 0px;
    background-color: var(--v-primary-base);
    color: white;
    display: inline-block;
    padding: 6px 24px;
    border-radius: 4em;
}
.hbspt-form .hs-submit:hover{
  opacity: 0.8;
}

.hbspt-form .hs-form-booleancheckbox-display, .hbspt-form .hs-error-msg {
  font-size: .75rem!important;
  line-height: var(--body-2-line-height) !important;
  font-weight: 400 !important;
}

.hbspt-form .hs-form-radio-display{
  font-weight:400 !important;
  font-size: var(--body-2-size) !important;
}

.hbspt-form input.error {
    border-color: var(--v-error) !important;
}
.hbspt-form .hs-error-msg {
    color: var(--v-error) !important;;
}

.hbspt-form .legal-consent-container .inputs-list {
    list-style: none;
    padding-left: 0;
}

.hbspt-form .legal-consent-container .hs-richtext p{
  font-size: .75rem!important;
  line-height: var(--body-2-line-height) !important;
}

.hbspt-form fieldset{
    max-width: none !important;
    width: 100% !important;
    margin: 0px !important;
}
.hbspt-form fieldset div{
    margin-top:12px !important;
    margin-bottom:12px !important;
}
@media (max-width: 767px) {
    .form-columns-2{
        flex: 1;
        display: block;
    }
    .hbspt-form .hs-firstname, 
    .hbspt-form .hs-lastname {
        max-width: 100%;
    }

    .hbspt-form .hs-firstname, .hbspt-form .hs-lastname {
        max-width: 100%;
        width: 100% !important;
    }
}
</style>