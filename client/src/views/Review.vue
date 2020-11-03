<template>
    <div class="container">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1563 1696" style="margin-top:5%">
            
            <g id="Group_5" data-name="Group 5" transform="translate(-198 -226)">
                <path id="Rectangle_19" data-name="Rectangle 19" d="M10,0H1469a50,50,0,0,1,50,50V1611a50,50,0,0,1-50,50H50a50,50,0,0,1-50-50V10A10,10,0,0,1,10,0Z" transform="translate(242 261)" fill="#fff"/>
                <path id="Rectangle_18" data-name="Rectangle 18" d="M10,0H1469a50,50,0,0,1,50,50V1611a50,50,0,0,1-50,50H50a50,50,0,0,1-50-50V10A10,10,0,0,1,10,0Z" transform="translate(198 226)" fill="#fff"/>
            </g>
            <text x="0" y="15" fill="red">I love SVG!สสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสสกกกกกกกกกกกกกกกกกกกกกกกสสสสสสสสสส</text>
            
        </svg>
    </div>
    
</template>

<script>
export default {
    props: {
        reviewId: {
            type: String,
            required: true
        }
    },
    mounted() {
        console.log(this.reviewId);
    }
    
}
</script>