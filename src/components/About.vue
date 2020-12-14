<template>
	<div class="container fluid">
		<section class="hero">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">
						<span class="tag is-success">Free</span> STRUCTURAL DESIGN WEB APPLICATION
					</h1>
					<!-- <h2 class="subtitle">
						<span class="tag is-success">Free</span> structural design web application
					</h2> -->
					<div class="is-flex-tablet">
						<section class="section">
							<div class="container">
								<h1 class="title">INTUITIVE</h1>
                <div class="mb-2">
                  <span class="icon">
                    <i class="fa fa-check fas fa-3x"></i>
                  </span>
                </div>
                <div class="notification is-success is-light has-text-weight-light mt-1"> 
                  Simple user interface with minimlistic input and concise output
                </div>
								<!-- <h2 class="subtitle">
									Minimum input parameter with color coded checks
								</h2> -->
							</div>
						</section>
						<section class="section">
							<div class="container">
								<h1 class="title">FAST</h1>
                <div class="mb-2">
                  <span class="icon">
                    <i class="fa fa-bolt fas fa-3x"></i>
                  </span>
                </div>
								<h2 class="notification is-success is-light has-text-weight-light mt-1">
									Blazing fast computations and search capability
								</h2>
							</div>
						</section>
						<section class="section">
							<div class="container">
								<h1 class="title">TOOLBOX</h1>
                <div class="mb-2">
                  <span class="icon">
                    <i class="fa fa-pencil-alt fas fa-3x"></i>
                  </span>
                </div>
								<h2 class="notification is-success is-light has-text-weight-light mt-1">
									Numerous modules each tailored to solve a unique practical problem
								</h2>
							</div>
						</section>
					</div>
          <div class="is-flex has-text-centered">
            <div class="tags has-addons">
              <span class="tag is-info is-large">{{modules.length}}</span>
              <span class="tag is-light is-large">Modules available</span> 
            </div>
          </div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
  name: "about-component",
  props:['modules'],
  data() {
    return {
      msg: "About Component"
    };
  }
};
</script>

<style scoped>
	p {
		background-color: blue;
	}
</style>