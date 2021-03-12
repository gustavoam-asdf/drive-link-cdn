const $driveLink  = document.getElementById('driveLink'),
      $cdnLink    = document.getElementById('cdnLink'),
      $error      = document.querySelector('.error'),
      $correct    = document.querySelector('.correct'),
      $copy       = document.getElementById('copy')

const verifyDriveLink = /^https:\/\/drive.google.com\/file\/d\/[\w-]+\/view\?usp=sharing$/gi,
      prev            = 32,  // === 'https://drive.google.com/file/d/'.length
      post            = -17  // === '/view?usp=sharing'.length

$driveLink.addEventListener('keyup', e => {
  // Don't execute anything with these keys or key combinations
  if ((e.ctrlKey && ([17,65,67,88,89,91].includes(e.keyCode))) || [17,27,37,38,39,40].includes(e.keyCode)) return
  
  // Show error if link isn't correct and disable button copy
  if (!verifyDriveLink.test($driveLink.value.trim())) {
    $error.classList.add('show')
    $copy.setAttribute('disabled', '')
    $cdnLink.value = ''
    return
  }

  // Hide error and enable button copy
  $error.classList.remove('show')
  $copy.removeAttribute('disabled')

  // Cut file id and then insert it in cdn link format
  const id = $driveLink.value.slice(prev, post),
        cdnLink = `https://drive.google.com/uc?export=download&id=${id}`
  $cdnLink.value = cdnLink
})

$copy.addEventListener('click', () => {
  $cdnLink.select()
  // Command deprecated
  document.execCommand("copy")
  getSelection().empty()
  $correct.classList.add('show')
  setTimeout(() => {
    $correct.classList.remove('show')
  }, 1500)
})