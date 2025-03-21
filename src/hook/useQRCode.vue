<script lang="ts">
import type { MaybeRefOrGetter } from 'vue'
import { isClient, toRef } from '@vueuse/shared'
import QRCode from 'qrcode'
import { shallowRef, watch } from 'vue'

const useQRCode = (text: MaybeRefOrGetter<string>, options?: QRCode.QRCodeToDataURLOptions) => {
  const src = shallowRef<string>('')

  if (!isClient) return { src }

  const textRef = toRef(text)
  const result = shallowRef('')

  const generateQRCode = async (value: string) => {

    try {
      if (value && isClient) {
        result.value = await QRCode.toDataURL(value, options)
      }
    } catch (error) {
      result.value = '';
    }
  }

  watch(textRef, (newValue) => {
    generateQRCode(newValue)
  }, { immediate: true })

  return { result }
}

export default useQRCode
</script>