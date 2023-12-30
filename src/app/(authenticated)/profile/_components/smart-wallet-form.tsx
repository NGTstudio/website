import {
  CreateAccountButton,
  SmartWalletUpdater,
} from "@/app/(authenticated)/profile/_components/create-account-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { getAccountCookie } from "@/lib/cookies/account";
import { getEvoBalance, getGasBalance, isAccountCreated, predictAccountAddress } from "@/lib/evoverses/engine";
import { UserReadOnlyData } from "@/lib/playfab/helpers";
import { CheckIcon, ExclamationTriangleIcon, HomeIcon } from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type AccountCardProps = {
  title: string;
  description: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
}

const AccountCard = ({ title, description, icon: Icon }: AccountCardProps) => {
  return (
    <Card className="flex flex-col w-full sm:max-w-[220px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{description}</div>
      </CardContent>
    </Card>
  );
};

type SmartWalletFormProps = {
  accountId: string;
  userReadOnlyData: UserReadOnlyData;
}

const SmartWalletForm = async ({ accountId, userReadOnlyData }: SmartWalletFormProps) => {
  const accountCookie = getAccountCookie();
  const [ address, created ] = await Promise.all([
    predictAccountAddress(accountId),
    isAccountCreated(accountId),
  ]);
  const [ gasBalance, evoBalance ] = await Promise.all([
    getGasBalance(address),
    getEvoBalance(address),
  ]);

  return created ? userReadOnlyData?.wallets?.managed === address ? (
    <div className="flex flex-wrap gap-4">
      <AccountCard title="Account Status" description="Healthy" icon={CheckIcon} />
      <AccountCard title="Smart Wallet" description={`${address.slice(0, 4)}...${address.slice(-6)}`} icon={HomeIcon} />
      <AccountCard
        title="Gas Balance"
        description={`${gasBalance.displayValue} ${gasBalance.symbol}`}
        icon={Icons.currency_dollar as any}
      />
      <AccountCard
        title="EVO Balance"
        description={`${evoBalance.displayValue} ${evoBalance.symbol}`}
        icon={Icons.currency_dollar as any}
      />
    </div>
  ) : (
    <SmartWalletUpdater
      created={created}
      accountId={accountId}
      address={address}
      userReadOnlyData={userReadOnlyData}
    />
  ) : (
    <Alert variant="warning" className="flex justify-between items-center">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <div>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Looks like you haven&apos;t created your backend smart account yet!
        </AlertDescription>
      </div>
      <CreateAccountButton accountId={accountId} address={address} userReadOnlyData={userReadOnlyData} />
    </Alert>
  );
};

export default SmartWalletForm;
