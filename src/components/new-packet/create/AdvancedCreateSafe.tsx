import { Container, Typography, Grid } from '@mui/material'
import { useRouter } from 'next/navigation'

import useWallet from '@/hooks/wallets/useWallet'
import OverviewWidget from '@/components/new-packet/create/OverviewWidget'
import type { TxStepperProps } from '@/components/new-packet/CardStepper/useCardStepper'
import SetNameStep from '@/components/new-packet/create/steps/SetNameStep'
import OwnerPolicyStep from '@/components/new-packet/create/steps/OwnerPolicyStep'
import ReviewStep from '@/components/new-packet/create/steps/ReviewStep'
import { CreateSafeStatus } from '@/components/new-packet/create/steps/StatusStep'
import { CardStepper } from '@/components/new-packet/CardStepper'
import { AppRoutes } from '@/config/routes'
import { CREATE_PACKET_CATEGORY } from '@/services/analytics'
import type { CreateSafeInfoItem } from '@/components/new-packet/create/CreateSafeInfos'
import CreateSafeInfos from '@/components/new-packet/create/CreateSafeInfos'
import { useState } from 'react'
import { type NewPacketFormData } from '.'
import AdvancedOptionsStep from './steps/AdvancedOptionsStep'
// import { getLatestSafeVersion } from '@/utils/chains'
import { useCurrentChain } from '@/hooks/useChains'

const AdvancedCreateSafe = () => {
  const router = useRouter()
  const wallet = useWallet()
  const chain = useCurrentChain()

  const [safeName, setSafeName] = useState('')
  const [dynamicHint, setDynamicHint] = useState<CreateSafeInfoItem>()
  const [activeStep, setActiveStep] = useState(0)

  const CreateSafeSteps: TxStepperProps<NewPacketFormData>['steps'] = [
    {
      title: 'Select network and name of your Safe Account',
      subtitle: 'Select the network on which to create your Safe Account',
      render: (data, onSubmit, onBack, setStep) => (
        <SetNameStep setSafeName={setSafeName} data={data} onSubmit={onSubmit} onBack={onBack} setStep={setStep} />
      ),
    },
    {
      title: 'Signers and confirmations',
      subtitle:
        'Set the signer wallets of your Safe Account and how many need to confirm to execute a valid transaction.',
      render: (data, onSubmit, onBack, setStep) => (
        <OwnerPolicyStep
          setDynamicHint={setDynamicHint}
          data={data}
          onSubmit={onSubmit}
          onBack={onBack}
          setStep={setStep}
        />
      ),
    },
    {
      title: 'Advanced settings',
      subtitle: 'Choose the Safe version and optionally a specific salt nonce',
      render: (data, onSubmit, onBack, setStep) => (
        <AdvancedOptionsStep data={data} onSubmit={onSubmit} onBack={onBack} setStep={setStep} />
      ),
    },
    {
      title: 'Review',
      subtitle:
        "You're about to create a new Safe Account and will have to confirm the transaction with your connected wallet.",
      render: (data, onSubmit, onBack, setStep) => (
        <ReviewStep data={data} onSubmit={onSubmit} onBack={onBack} setStep={setStep} />
      ),
    },
    {
      title: '',
      subtitle: '',
      render: (data, onSubmit, onBack, setStep, setProgressColor, setStepData) => (
        <CreateSafeStatus
          data={data}
          onSubmit={onSubmit}
          onBack={onBack}
          setStep={setStep}
          setProgressColor={setProgressColor}
          setStepData={setStepData}
        />
      ),
    },
  ]

  const initialStep = 0
  const initialData: NewPacketFormData = {
    name: '',
    recipient: '',
    amount: 0,
    owners: [],
    threshold: 1,
    saltNonce: 0,
    packetVersion: '0.0.1',
  }

  const onClose = () => {
    router.push(AppRoutes.welcome.index)
  }

  return (
    <Container>
      <Grid container columnSpacing={3} justifyContent="center" mt={[2, null, 7]}>
        <Grid item xs={12}>
          <Typography variant="h2" pb={2}>
            Create new Safe Account
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} order={[1, null, 0]}>
          <CardStepper
            initialData={initialData}
            initialStep={initialStep}
            onClose={onClose}
            steps={CreateSafeSteps}
            eventCategory={CREATE_PACKET_CATEGORY}
            setWidgetStep={setActiveStep}
          />
        </Grid>

        <Grid item xs={12} md={4} mb={[3, null, 0]} order={[0, null, 1]}>
          <Grid container spacing={3}>
            {activeStep < 2 && <OverviewWidget packetName={safeName} recipient="" amount={0} />}
            {wallet?.address && <CreateSafeInfos dynamicHint={dynamicHint} />}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AdvancedCreateSafe
