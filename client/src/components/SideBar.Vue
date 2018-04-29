<template>
<div>
  <ul class="nav flex-column">
    <li class="nav-item">
      <a class="nav-link" href="/Home">
        <i class="fas fa-chart-line"></i>
        Dashboard <span class="sr-only">(current)</span>
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="/items">
        <i class="fas fa-cart-plus"></i>
        Items
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">
        <i class="fas fa-globe"></i>
        Sites
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">
        <i class="far fa-credit-card"></i>
        Deals
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">
        <i class="fas fa-history"></i>
        Reports
      </a>
    </li>
  </ul>

  <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
    <span>Saved reports</span>
    <a class="d-flex align-items-center text-muted" href="#">
      <i class="fas fa-plus-circle"></i>
    </a>
  </h6>
  <ul class="nav flex-column mb-2">
    <li class="nav-item">
      <a class="nav-link" href="#">
        <i class="fas fa-file-pdf"></i>
        Current month
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">
        <i class="fas fa-file-pdf"></i>
        Last quarter
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">
        <i class="fas fa-file-pdf"></i>
        Biggest savings
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">
        <i class="fas fa-file-pdf"></i>
        Black Friday
      </a>
    </li>
  </ul>
</div>
</template>

<style>
.sidebar-sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 48px; /* Height of navbar */
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}
</style>
