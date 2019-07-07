<template>
     <div class="all-tags-container">
          <div v-for="(tag , title) in tags" :key="title">
            <h2> {{title}} </h2>
            <div class="tag-container">
              <div class="tags" v-for="(tagObject, index) in tag" :key="index">
                <label class="tag-label" 
                       :for="tagObject.description">
                       {{tagObject.description}}
                </label>
                <input type="checkbox"
                       class="tag-checkbox"
                       :value="tagObject"
                       v-model="checkedTags">
              </div>
            </div>
          </div>
        </div>
</template>

<script>
export default {
  name: "TagsContainer",
  props: ["tags"],
  data(){
    return{
        checkedTags:[],
    }
  },
  methods:{
  },
  computed:{
     /* given a flat array of tag objects, this computed property
        will return a new object which has grouped unique tag property
        names into seperate array object.
        e.g [{"colour":"blue","description":"Fitness","tag":"productivity"},
             {"colour":"blue","description":"Frustrated","tag":"mood"},
             {"colour":"blue","description":"Angry","tag":"mood"}]
        returns:
            {
                mood:[{"colour":"blue","description":"Frustrated","tag":"mood"},
                      {"colour":"blue","description":"Angry","tag":"mood"}],
                productivity:[{"colour":"blue","description":"Fitness","tag":"productivity"}]
            }*/
    tagsObject(){
      /* returns an array of unique tags from an array of tag objects
      firstly loops over all tag keys in the tags object
      this is done within a Set object - it is similar to an Array Object
      but it guarantees unique items so it dose the deduplication for us.
      finally the output set object is spread back into an Array so we have
      a good'ol Array to work with instead of a Set which has weird api. */

      let uniqueTags = [...new Set(this.checkedTags.map(index => index.tag ))]

      //contructs the shell of the tags object for firebase
      //we iterate and push the corresponding tag objects into
      //the relevant array in the next block
      
      let objectFromUniqueTags = (() => {
          const obj = {};
          for (const key of uniqueTags) {
              obj[key] = [];
          }
          return obj
      })() //eg. returns { mood: [], productivity: [] }

      //loops over all checkedTags items and push into 
      //corresponding category in objectFromUniqueTags
      for (let tags in uniqueTags){
          this.checkedTags.filter(tag => {
              // console.log(tag)
              if(tag.tag === uniqueTags[tags]){
                  objectFromUniqueTags[uniqueTags[tags]].push(tag)
              } 
          })
      }

      return objectFromUniqueTags
    }
  },
  watch:{
    checkedTags(){
      this.$emit('checked-tags', this.tagsObject)
    }
  }
}
</script>

<style lang="scss" scoped>

.tag-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center
}

.tags{
  margin:-30px 5px 0px 0px
}
  
input[type=checkbox]  {
    border-style: solid;
    appearance: none;
    width:100%;
    border-radius: 10px;
}

label.tag-label {
  top: 38px;
  left: 20px;
  position: relative;
  z-index: -1;
}


input.tag-checkbox:hover {
    background:rgba(255, 192, 203, 0.404) 
}


input.tag-checkbox:checked {
    background:rgba(192, 193, 255, 0.404) 
}

</style>
