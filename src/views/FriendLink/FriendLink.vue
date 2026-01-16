<script setup>

</script>

<template>
  <div class="friendLink-page">
    <div class="friendLink-content">
      <div class="friendLink-title">友情链接</div>
      <div class="friendLink-item">
        <a class="icon" href="http://www.pdxstudio.site/" target="_blank" rel="noopener noreferrer" style="background-image: url('https://q.qlogo.cn/headimg_dl?dst_uin=428488368&spec=640&img_type=jpg')"></a>
        <span class="site-name">派大星工作室</span>
        <a class="site-link" href="http://www.pdxstudio.site/" target="_blank" rel="noopener noreferrer">http://www.pdxstudio.site/</a>
      </div>
      <div class="friendLink-item">

      </div>
      <div class="friendLink-item">

      </div>
      <div class="friendLink-item">

      </div>
    </div>
  </div>
</template>

<style scoped>
  .icon{
    display: block;
    width: 80px;
    height: 80px;
    background-size: cover;
    background-position: center;
    border-radius: 40px;
    flex: 0 0 auto;
    transition: transform .18s ease, box-shadow .18s ease, outline-color .18s ease;
  }

  .icon:hover{
    transform: scale(1.06);
    box-shadow: 0 8px 20px rgba(0,0,0,0.35);
    outline: 2px solid rgba(57,181,74,0.12);
  }

  .friendLink-content a{
    text-decoration: none;
    color: inherit;
    transition: color .18s ease;
  }

  .friendLink-item a:hover{
    color: #39b54a; /* green */
  }

  .friendLink-page{
    background: black url('@/assets/background/bg_01.jpg') no-repeat center top;
    background-size: cover;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .friendLink-title{
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    font-size: 30px;
  }
  .friendLink-content{
    width: 900px;
    height: 900px;
    background-color: rgba(0,0,0, 0.5);
    color: white;
    padding: 30px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .friendLink-item{
    width: 100%;
    height: 100px;
    border: 1px solid rgba(255,255,255,0.5);
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 10px 16px;
    box-sizing: border-box;
  }
  .friendLink-item .site-name{
    font-size: 18px;
    color: #fff;
  }
  .friendLink-item .site-link{
    margin-left: 20%;
    color: #fff;
    text-decoration: none;
    font-size: 14px;
  }
</style>
