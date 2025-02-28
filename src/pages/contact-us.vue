<template>
<page>
  <container-sm>
    <page-title>Contact us</page-title>
    <page-section>
      <v-card class="hbspt-form-card elevation-0 py-4 px-10" style="max-width: 600px;">
        <div class="hbspt-form" id="hbspt-form-31184627-79a8-4973-9ed3-8cfe47d1cdd3" v-once></div>
      </v-card>
 
    </page-section>
  </container-sm>
</page>
</template>

<script>
  export default {
    mounted() {
    const script = document.createElement("script");
    script.src="https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);
    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "23265540",
          formId: "2a0b0448-c46f-4bd0-9ba5-84520afafd68",
          target: "#hbspt-form-31184627-79a8-4973-9ed3-8cfe47d1cdd3"
        })
      }
    })
  }
}
</script>
<style>
.hbspt-form-card{
  border: 1px solid var(--v-primary-lighten-4) !important;
  border-radius: 4px !important;
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



.hbspt-form .hs-firstname, 
.hbspt-form .hs-lastname {
    width: 50% !important;
}
.hbspt-form .input input  {
    background-color: #fafafa;
    border: 1px solid #dedede;
}

.hbspt-form .input {
    margin-right: 0 !important;
    margin-top:8px !important;
}
.hbspt-form .submitted-message p{
  font-size: var(--h4-size) !important;
  line-height: var(--h4-line-height) !important;
  font-weight: 300 !important;
}

.hbspt-form input[type=text], .hbspt-form input[type=email] {
    height: 32px;
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

.hbspt-form .hs-submit {
    margin: 0px 0px 24px 0px;
    background-color: var(--v-primary);
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
  max-width: 100% !important;
  margin-bottom: 24px !important;

}

@media (max-width: 767px) {
    .hbspt-form .hs-firstname, .hbspt-form .hs-lastname {
        max-width: 100%;
        width: 100% !important;
    }
}
</style>